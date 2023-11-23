import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Main {
    public static void main(String[] args) {
        // JDBC URL for Windows authentication

        try {
            String URL = "jdbc:sqlserver://DESKTOP-M9UAP31\\SQLEXPRESS:60091;databaseName=Cric360;integratedSecurity=true;trustServerCertificate=true";
            Connection conn = DriverManager.getConnection(URL);
            System.out.println("Connection Successful");

            // SQL query
            String sqlQuery = "SELECT * FROM blog";

            // Create a PreparedStatement
            try (PreparedStatement preparedStatement = conn.prepareStatement(sqlQuery)) {
                // Execute the query and get the result set
                try (ResultSet resultSet = preparedStatement.executeQuery()) {
                    // Process the result set
                    while (resultSet.next()) {
                        // Retrieve values from the result set
                        int id = resultSet.getInt("id");
                        String title = resultSet.getString("title");
                        String content = resultSet.getString("contentWritten");
                        int writtenBy = resultSet.getInt("writtenBy");

                        // Print or process the values as needed
                        System.out.println("ID: " + id + ", Title: " + title + ", Content: " + content + ", Written By: " + writtenBy);
                    }
                }
            }
        } catch (SQLException e) {
            System.out.println("Connection Failed");
            e.printStackTrace();
        }
    }
}
