# exception
* exception[meta header]

`<exception>`ヘッダでは、C++プ�グラムでの例外の扱いに関連した、いくつかのクラスと関数を定義する。


| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------|-----------------------------------------------|-------|
| [`exception`](exception/exception.md)         | 標準例外の基底クラス(class) | |
| [`bad_exception`](exception/bad_exception.md) | 関数で例外の型を制限し、指定外の方が送出された場合に発生させる(class) | |
| [`nested_exception`](exception/nested_exception.md) | 例外構造をネストさせる場合に利用する例外クラス(class) | C++11 |
| [`set_unexpected`](exception/set_unexpected.md) | 予想外の例外が発生した場合の処理を行う関数を�定する(function) | C++11から非推奨<br/> C++17で削除 |
| [`get_unexpected`](exception/get_unexpected.md) | 予想外の例外が発生した場合の処理を行う関数を取得する(function) | C++11<br/> C++11から非推奨<br/> C++17で削除 |
| [`unexpected`](exception/unexpected.md) | 予想外の例外が発生した場合の処理を呼び出す(function) | C++11から非推奨<br/> C++17で削除 |
| [`set_terminate`](exception/set_terminate.md) | 例外が処理されなかった場合の処理を行う関数を�定する(function) | |
| [`get_terminate`](exception/get_terminate.md) | 例外が処理されなかった場合の処理を行う関数を取得する(function) | | C++11 |
| [`terminate`](exception/terminate.md) | 例外が処理されなかった場合の処理を行う関数を呼び出す(function) | |
| [`uncaught_exception`](exception/uncaught_exception.md) | 例外処理�かを判別する(function) | C++17から非推奨<br/> C++20で削除 |
| [`uncaught_exceptions`](exception/uncaught_exceptions.md) | 未処理の例外数を取得する(function) | C++17 |
| [`exception_ptr`](exception/exception_ptr.md) | 例外格納用ポインタ(type-alias) | C++11 |
| [`current_exception`](exception/current_exception.md) | 現在処理�の例外オブジェクトを指す例外ポインタを取得する(function) | C++11 |
| [`rethrow_exception`](exception/rethrow_exception.md) | 例外ポインタが指す例外を送出する(function) | C++11 |
| [`make_exception_ptr`](exception/make_exception_ptr.md) | 例外ポインタを作成する(function) | C++11 |
| [`throw_with_nested`](exception/throw_with_nested.md) | 現在の例外を入れ�にした例外を送出する(function) | C++11 |
| [`rethrow_if_nested`](exception/rethrow_if_nested.md) | 入れ�になった例外が�在する場合に、入れ�になった例外を送出する(function) | C++11 |

