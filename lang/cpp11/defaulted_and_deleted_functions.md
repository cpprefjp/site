#関数のdefault／delete宣言
* cpp11[meta cpp]

##概要
クラスを定義した際、以下のメンバ関数が暗黙的に定義される：

- デフォルトコンストラクタ
- コピーコンストラクタ
- ムーブコンストラクタ
- コピー代入演算子
- ムーブ代入演算子
- デストラクタ

C++では、暗黙定義される特殊関数を制御するために、`= default`と`= delete`という命令が追加された。

`= default`は、「暗黙定義されるデフォルトの挙動を使用し、`inline`や`virtual`といった修飾のみを明示的に指定する」という目的に使用する機能である：

```cpp
class X {
public:
  // 暗黙定義される挙動をする、
  // 仮想関数のデストラクタを定義する
  virtual ~X() = default;

  // 暗黙定義される挙動をする、
  // インライン関数のコピーコンストラクタを定義する
  inline ~X(const X&) = default;
};
```

`= delete`は、特殊関数の暗黙定義を明示的に禁止するための機能である。これは、コピーを禁止するクラスを定義するような場合にしようする：

```cpp
class X {
public:
  // コピーを禁止し、ムーブを許可する
  X(const X&) = delete;
  X& operator=(const X&) = delete;

  // 特殊メンバ関数を明示的に定義もしくはdeleteした場合、
  // それ以外の特殊メンバ関数は明示的に定義もしくはdefault宣言しなければ
  // 暗黙定義されない
  X(X&&) = default;
  X() = default;
  X& operator=(X&&) = default;
};

int main()
{
  X x1;
//X x2 = x1;  // コンパイルエラー！Xのコピーコンストラクタはdelete宣言されている
  X x3 = X(); // OK : ムーブコンストラクトはできる

  X x4;
//x4 = x1;    // コンパイルエラー！Xのコピー代入演算子はdelete宣言されている

  X x5;
  x5 = X();   // OK : ムービ代入はできる
}
```

`= delete`は特殊メンバ関数以外に対しても使用できる。

```cpp
void f() = delete; // OK

int main()
{
//f(); // コンパイルエラー！関数f()はdelete宣言されている
}
```

これは、特定のパラメータ型を持つオーバーロードを明示的に禁止するためにも使用できる。


##仕様
- `= default`は「明示的なデフォルト定義 (explicity-defaulted definition)」と呼ばれる機能である。この機能は、暗黙定義される非インライン、かつ非仮想の特殊メンバ関数の挙動をそのままにして、実装に対してより効率的な定義の使用を求めることを許可するものである：

    ```cpp
struct sometype {
  sometype();

  // デフォルト動作のコピーコンストラクタを使用する
  sometype(const sometype &) = default;

  // デフォルト動作のデストラクタを使用する。
  // ただし、このデストラクタは仮想関数とする。
  virtual ~sometype() = default;
};

// デフォルト動作のデフォルトコンストラクタを使用する
sometype::sometype() = default;

// デストラクタをインライン関数にする
inline sometype::~sometype() = default;
```


- `= delete`は「削除定義 (deleted definition)」と呼ばれる機能である。暗黙定義される特殊メンバ関数を含む任意の関数の最初の宣言に対して`= delete`が指定された場合、その関数は呼び出せなくなる。最初の宣言以外に対して`= delete`が指定された場合、そのプログラムは不適格となる。

    ```cpp
struct sometype {
    sometype();
};

// コンパイルエラー！= deleteはここではなく、最初の宣言に対して指定しなければならない
sometype::somtype() = delete;
```

    - 削除定義された関数は、暗黙的にインラインとなる。もしその関数が外部リンケージを持ち、ひとつの翻訳単位で削除定義された場合、全ての翻訳単位で削除定義される。削除定義された関数は、
        - 関数呼び出しの式で呼び出せてはならない
        - オーバーロード解決の最有力候補となってはならない
        - 関数ポインタに変換できてはならない
        - 初期化子として使用できてはならない
        - 暗黙的な関数呼び出しができてはならない
    - 非静的メンバ変数が削除定義された特殊メンバ関数を持つ場合、その変数をメンバとして持つクラスのその特殊メンバ関数は、暗黙的に削除定義される


##参照
- [N1582 Compiler Generated Defaults](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1582.pdf)
- [N1702 explicit class and default definitions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1702.pdf)
- [N1707 explicit class and default definitions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1717.pdf)
- [N2210 Defaulted and Deleted Functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2210.html)
- [N2326 Defaulted and Deleted Functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2326.html)
- [N3172 To move or not to move](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3174.pdf)

