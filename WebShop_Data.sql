use Nhom14_WebShop;
/* Customers */
insert into users(email, password, dial, address, status) values('lamtehao@gmail.com', '1612175', '0933337663', 'DH KHTN Q5 TPHCM', 1);
insert into users(email, password, dial, address, status) values('tranquocanh858@gmail.com', '1612018', '0365635427', 'DH KHTN Q5 TPHCM', 1);
/* Employees */
insert into users(email, password, dial, address, status, type) values('baoit256@gmail.com', '1612036', '0938443767', 'DH KHTN Q5 TPHCM', 1, 1);
insert into employees(id) values(3);
/* Admins */
insert into users(email, password, dial, address, status, type) values('admin@gmail.com', '12345678', '0123456789', 'DH KHTN Q5 TPHCM', 1, 2);
insert into admins(id) values(4);
/* Categories */
insert into categories(name, status) values('Framework', 1);
insert into categories(name, status) values('IDE', 1);
insert into categories(name, status) values('Windows', 1);
insert into categories(name, status) values('iOS', 1);
insert into categories(name, status) values('StackOverflow', 1);
insert into categories(name, status) values('Other', 1);
/* Sub-categories*/
/*
insert into categories(name, status, parent_id) values('Yii', 1, 1);
insert into categories(name, status, parent_id) values('Spring', 1, 1);
insert into categories(name, status, parent_id) values('Other', 1, 1);
insert into categories(name, status, parent_id) values('VisualStudio', 1, 2);
insert into categories(name, status, parent_id) values('Xcode', 1, 2);
insert into categories(name, status, parent_id) values('Other', 1, 2);
*/
/* Products */
insert into products(id_category, name, imgUrl, price, status) values(1, 'Yii - White', 'http://aothunit.com/asset/images/products/x2/1532239618.0543_11.png', 10, 1);
insert into products(id_category, name, imgUrl, price, status) values(1, 'Yii - Black', 'http://aothunit.com/asset/images/products/x2/1532239582.304_12.png', 10, 1);
insert into products(id_category, name, imgUrl, price, status) values(1, 'Magneto - White', 'http://aothunit.com/asset/images/products/x2/magento_04_trang.png', 10, 1);
insert into products(id_category, name, imgUrl, price, status) values(1, 'Spring - Black', 'http://aothunit.com/asset/images/products/x2/1521364409.3762_dmeo08.png', 10, 1);

insert into products(id_category, name, imgUrl, price, status) values(2, 'VisualStudio1', 'http://aothunit.com/asset/images/products/x2/1506989159.0836_38.jpg', 10, 1);
insert into products(id_category, name, imgUrl, price, status) values(2, 'Sublime1', 'http://aothunit.com/asset/images/products/x2/1521363953.8382_demo03.png', 10, 1);
insert into products(id_category, name, imgUrl, price, status) values(2, 'Xcode', 'http://aothunit.com/asset/images/products/x2/1557151759.9826_54372145_598376820630326_1928359244101320704_n.jpg', 10, 1);

insert into products(id_category, name, imgUrl, price, status) values(3, 'Windows - black', 'http://aothunit.com/asset/images/products/x2/windows04_01.png', 10, 1);
insert into products(id_category, name, imgUrl, price, status) values(3, 'Windows - white', 'http://aothunit.com/asset/images/products/x2/windows09_02.png', 10, 1);
insert into products(id_category, name, imgUrl, price, status) values(3, 'Windows - blue', 'http://aothunit.com/asset/images/products/x2/windows06_03.png', 10, 1);

insert into products(id_category, name, imgUrl, price, status) values(4, 'Apple - white', 'http://aothunit.com/asset/images/products/x2/apple08_02.png', 10, 1);
insert into products(id_category, name, imgUrl, price, status) values(4, 'Apple - grey', 'http://aothunit.com/asset/images/products/x2/apple08_06.png', 10, 1);
insert into products(id_category, name, imgUrl, price, status) values(4, 'Swift - grey', 'http://aothunit.com/asset/images/products/x2/apple01_07.png', 10, 1);

insert into products(id_category, name, imgUrl, price, status) values(5, 'StackOverflow - white', 'http://aothunit.com/asset/images/products/x2/stackover-01-02.png', 10, 1);

/*other currently has no product*/

/* Banking cards */
insert into banking_cards(id_user, cardNum, type) values(1, 1234123412341234, 0);
insert into banking_cards(id_user, cardNum, type) values(2, 123456123456, 0);

/* Invoices */
insert into invoices(id_customer, status, createDate, estimatedDeliveryDate, total) values(1, 3, curdate(), curdate(), 30);
insert into invoiceDetails(id_product, id_invoice, quantity, singlePrice) values(1, 1, 2, 10); 
insert into invoiceDetails(id_product, id_invoice, quantity, singlePrice) values(10, 1, 1, 10); 

insert into invoices(id_customer, status, createDate, estimatedDeliveryDate, total) values(2, 3, curdate(), curdate(), 10); 
insert into invoiceDetails(id_product, id_invoice, quantity, singlePrice) values(7, 2, 1, 10); 