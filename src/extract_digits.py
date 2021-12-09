import cv2
import matplotlib.pyplot as plt

image = cv2.imread('pinball_score.png')
original = image.copy()
h, w, _ = image.shape

gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (2,2))
close = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel, iterations=2)

cnts = cv2.findContours(close, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
cnts = cnts[0] if len(cnts) == 2 else cnts[1]
minimum_area = 0.75 * h * w
cnts = [c for c in cnts if cv2.contourArea(c) < minimum_area]
cnts = sorted(cnts, key=cv2.contourArea, reverse=True)
for c in cnts:
    x,y,w_box,h_box = cv2.boundingRect(c)
    ROI = original[y:y+h, x:x+w]
    cv2.rectangle(image, (x, y), (x + w_box, y + h_box), (0,0,255), 2)
    cv2.rectangle(ROI, (x, y), (x + w_box, y + h_box), (0,0,255), 10)
    break

gray2 = cv2.cvtColor(ROI, cv2.COLOR_BGR2GRAY)
blurred = cv2.GaussianBlur(gray2, (7, 7), 0)
(T, threshold) = cv2.threshold(blurred, 200, 255,	cv2.THRESH_BINARY)
cv2.imshow('img',threshold)
cv2.waitKey(0)  
cv2.imwrite('ROI_and_grayscale.png', threshold)

contours, hierarchy = cv2.findContours(threshold, cv2.RETR_LIST,cv2.CHAIN_APPROX_SIMPLE)[-2:]
idx =0 
for cnt in contours:
    idx += 1
    x,y,w,h = cv2.boundingRect(cnt)
    roi=ROI[y:y+h,x:x+w]
    cv2.rectangle(ROI,(x,y),(x+w,y+h),(200,0,0),2)
cv2.imshow('img',ROI)
cv2.waitKey(0)   