import React from 'react';

const Faq = () => {
    return (
        <div className='row center-align'>
            <div className='container white container-css'>
                <h5>User</h5>
                <p>1. Du kan börja med att registrera ett konto, det är dock inget krav.</p>
                <p>2. Be en moderator eller en admin att tilldela dig en kod för en runda.</p>
                <p>3. Tryck Starta nu på start sidan eller på Användar översikten och skriv in koden.</p>
                <p>4. Nu kan du spela!</p>
            </div>
            <div className='row'>
                <div className='container white container-css'>
                    <h5>Moderator</h5>
                    <p>1. Be en admin att tilldela dig en runda.</p>
                    <p>2. Redigera rundan</p>
                    <p>3. Dela ut rundans kod till användare</p>
                </div>
            </div>
            <div className='row'>
                <div className='container white container-css'>
                    <h5>Admin</h5>
                    <p>1. Skapa en runda.</p>
                    <p>2. Hantera moderatorer.</p>
                    <p>3. Redigera den eller dela ut den till en moderator som du har skapat.</p>
                </div>
            </div>
        </div>
    );
}

export default Faq;
