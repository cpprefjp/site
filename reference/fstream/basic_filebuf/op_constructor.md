#コンストラクタ
* fstream[meta header]

```cpp
basic_filebuf(); // (1)
basic_filebuf(basic_filebuf&& rhs); // (2) C++11
```

##概要
オブジェクトを構築する。

##効果

- (1): 基底クラスのコンストラクタ`basic_streambuf()`を呼び出す。
- (2): ムーブ構築する。構築完了後、以下の状態になる。

##事後条件
- (1)
    - 構築完了後、`is_open() == false`となる。
- (2): コンストラクタ呼び出し前の`rhs`を`rhs_p`、コンストラクタ呼び出し後の`rhs`を`rhs_a`と表記する。
    - `is_open() == rhs_a.is_open()`
    - `rhs_p.is_open() == false`
    - `gptr() - eback() == rhs_p.gptr() - rhs_p.eback()`
    - `egptr() - eback() == rhs_p.egptr() - rhs_p.eback()`
    - `pptr() - pbase() == rhs_p.pptr() - rhs_p.pbase()`
    - `epptr() - pbase() == rhs_p.epptr() - rhs_p.pbase()`
    - `eback() != rhs_a.eback()` （`eback()`が非`nullptr`の場合のみ）
    - `gptr() != rhs_a.gptr()` （`gptr()`が非`nullptr`の場合のみ）
    - `egptr() != rhs_a.egptr()` （`egptr()`が非`nullptr`の場合のみ）

##実装例

##バージョン
###言語
- C++98
- C++11: ムーブコンストラクタの追加

##参照
