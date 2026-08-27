# what
* exception[meta header]
* std[meta namespace]
* exception[meta class]
* function[meta id-type]

```cpp
virtual const char* what() const;                     // (1) C++98
virtual const char* what() const noexcept;            // (1) C++11
const char* what() const noexcept override;           // (1) C++17
constexpr const char* what() const noexcept override; // (1) C++26
```

## 概要
エラー理由となる実装依存文字列を取得する。


## 戻り値
処理系定義のNULL終端マルチバイト文字列へのポインタを返す。

返されたポインタの指す文字列は、それを取得した例外オブジェクトを破棄するか、その例外オブジェクトに対して非`const`なメンバ関数を呼び出すまで有効である。


## 例外
投げない


## 備考
- C++11 : 動的な型が同じ`T`である2つのオブジェクト`lhs`と`rhs`について、`lhs`が`rhs`のコピーである場合、[`std::strcmp`](/reference/cstring/strcmp.md)`(lhs.what(), rhs.what()) == 0`が成り立つ
    - この事後条件は、[`exception`](../exception.md)から派生する標準ライブラリのクラスすべてに要求される


## 関連項目
- [C++26 定数評価での例外送出を許可](/lang/cpp26/allowing_exception_throwing_in_constant-evaluation.md)


## 参照
- [LWG Issue 471. result of `what()` implementation-defined](https://cplusplus.github.io/LWG/issue471)
    - C++11で、コピーした例外オブジェクトの`what()`が元と同じ文字列を返すことが規定された。それ以前は「代入後に`what()`を呼び出した場合の効果は処理系定義」とされており、例外オブジェクトをコピーするとエラーメッセージが失われることが許されていた
