import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.*;

public class Captain_MainMenu extends JFrame{
    private JPanel panelMain;
    private JButton btnSeeRequests;
    private JButton writeBlogButton;
    private JButton leaderboardbutton;

    public Captain_MainMenu() {
        btnSeeRequests.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                // create captain request form
                CaptainRequestGUI captainRequestGUI = new CaptainRequestGUI();
                captainRequestGUI.setContentPane(captainRequestGUI.getPanelMain());
                captainRequestGUI.setSize(400, 400);
                captainRequestGUI.setLocationRelativeTo(null);
                captainRequestGUI.setVisible(true);
                captainRequestGUI.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

                dispose();

            }
        });

        writeBlogButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.out.println("Write Blog");
                Blog blog_obj = new Blog();
                blog_obj.setContentPane(blog_obj.getPanelMain());
                blog_obj.setSize(400, 400);
                blog_obj.setLocationRelativeTo(null);
                blog_obj.setVisible(true);
                blog_obj.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

                dispose();
            }
        });
        leaderboardbutton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.out.println("Show Leaderboard");
                LeaderBoard leaderBoard_obj = new LeaderBoard();
                leaderBoard_obj.setContentPane(leaderBoard_obj.getPanelMain());
                leaderBoard_obj.setSize(400, 400);
                leaderBoard_obj.setLocationRelativeTo(null);
                leaderBoard_obj.setVisible(true);
                leaderBoard_obj.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

                dispose();
            }
        });
    }

    public JPanel getPanelMain(){
        return panelMain;
    }
}
