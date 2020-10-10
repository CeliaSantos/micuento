CREATE USER IF NOT EXISTS 'mcadmin'@'%' IDENTIFIED BY 'MCPW1234';
GRANT INSERT ON task.* TO 'mcadmin'@'%';
GRANT DELETE ON task.* TO 'mcadmin'@'%';
GRANT SELECT ON task.* TO 'mcadmin'@'%';
GRANT UPDATE ON task.* TO 'mcadmin'@'%';
FLUSH PRIVILEGES;