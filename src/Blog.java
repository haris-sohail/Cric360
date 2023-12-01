import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.*;

public class Blog extends JFrame {

    private JPanel panelMain;
    private JLabel label1;
    private JLabel label2;
    private JTextField textField1;
    private JTextArea textArea1;
    private JButton submitButton;

    public JPanel getPanelMain() {
        return panelMain;
    }

    public Blog() {
        submitButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                // Get the values from the UI components
                String blogTitle = textField1.getText();
                String blogContent = textArea1.getText();

                // Get the logged-in username (assuming LoginGUI.loggedInUserName is a static field)
                String writtenBy = LoginGUI.loggedInUserName;

                // Get the next ID for the blog (replace with your logic for getting the next ID)
                //int nextId = getNextBlogId();

                // Save the blog information to the database
                saveBlogToDatabase( blogTitle, blogContent, writtenBy);

                System.out.println("Captain Main Menu");
                Captain_MainMenu captainmainmenu = new Captain_MainMenu();
                captainmainmenu.setContentPane(captainmainmenu.getPanelMain());
                captainmainmenu.setSize(400, 400);
                captainmainmenu.setLocationRelativeTo(null);
                captainmainmenu.setVisible(true);
                captainmainmenu.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

                dispose();
                // Display a confirmation message or perform any other necessary actions
                //JOptionPane.showMessageDialog(Blog.this, "Blog submitted successfully!");
            }
        });
    }

    // Replace this method with your logic for getting the next blog ID
    private int getNextBlogId(Connection connection) throws SQLException {
        // Get the next available ID for Blog
        try (Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery("SELECT MAX(id) FROM Blog")) {

            if (resultSet.next()) {
                return resultSet.getInt(1) + 1;
            } else {
                return 1; // If no rows in the table, start with ID 1
            }
        }
    }


    // Replace this method with your logic for saving the blog to the database
    // Replace this method with your logic for saving the blog to the database
    private void saveBlogToDatabase(String title, String content, String writtenBy) {
        try (Connection connection = DriverManager.getConnection(Main.connectionString)) {
            String query = "INSERT INTO Blog (id, title, contentWritten, writtenBy) VALUES (?, ?, ?, ?)";
            try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
                // Get the next available ID for Blog
                int nextId = getNextBlogId(connection);

                // Set values in the prepared statement
                preparedStatement.setInt(1, nextId);
                preparedStatement.setString(2, title);
                preparedStatement.setString(3, content);
                preparedStatement.setString(4, writtenBy);

                // Execute the SQL statement
                int rowsUpdated = preparedStatement.executeUpdate();

                if (rowsUpdated > 0) {
                    JOptionPane.showMessageDialog(this, "Blog saved successfully.");
                } else {
                    JOptionPane.showMessageDialog(this, "Error saving the blog.");
                }
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
            JOptionPane.showMessageDialog(Blog.this, "Error saving the blog to the database.");
        }
    }

}
