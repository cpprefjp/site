# failure
* ios[meta header]
* class[meta id-type]
* std[meta namespace]
* ios_base[meta class]

```cpp
namespace std {
  // C++03 まで
  class ios_base::failure : public exception {
  public:
    explicit failure(const string& msg);
    virtual ~failure();                         // 備考を参照
    virtual const char* what() const throw();
  };

  // C++11 から
  class ios_base::failure : public system_error {
  public:
    explicit failure(const string& msg, const error_code& ec = io_errc::stream);
    explicit failure(const char* msg, const error_code& ec = io_errc::stream);
  };
}
```
* ios_base[link ../ios_base.md]
* exception[link ../../exception/exception.md]
* system_error[link ../../system_error/system_error.md]
* error_code[link ../../system_error/error_code.md]
* io_errc[link ../io_errc.md]
* string[link ../../string/basic_string.md]

## 概要
[`ios_base`](../ios_base.md)`::failure` は、ストリームライブラリ内の関数で、ストリームバッファ操作の間に検出したエラーを報告するために、例外として送出される全てのオブジェクトの型の基底クラスとして定義されている。  
C++11 からは、エラー内容としてメッセージだけではなく、[`error_code`](../../system_error/error_code.md) を指定出来るようになった。  
これによって、ストリームの操作で発生したエラーをプ�グラムから判別することが容易になる。  
例えば、C++ 標準規格には、ストリームライブラリ内部で発生したエラーの [`error_code`](../../system_error/error_code.md) は [`io_errc`](../io_errc.md)`::stream` と [`iostream_category`](../iostream_category.md)`()` で、OS レイヤで発生したエラーの [`error_code`](../../system_error/error_code.md) は [`system_category`](../../system_error/system_category.md)`()` で例外を送出するのが一般的だろうとの記載がある。  
しかし、少なくとも現時点では [`error_code`](../../system_error/error_code.md) はあまり有効に機能していないようである。


## メンバ関数

| 名前                                         | 説明                   | 対応バージョン |
|----------------------------------------------|------------------------|----------------|
| [`(constructor)`](failure/op_constructor.md) | コンストラクタ         |                |
| [`what`](failure/what.md)                    | エラーメッセージの取得 | C++03 まで     |

なお、一見 C++11 で `what()` が無くなっているように見えるが、[`system_error`](../../system_error/system_error.md)`::what()` を継承しているため、メンバ関数自体は使用可能である。


## 備考
- [`ios_base`](../ios_base.md)`::failure` は、C++11 から基底クラスが変更になっている。  
    このため、C++03 まででも使用可能とするためには、基底クラスが [`system_error`](../../system_error/system_error.md) であることに依�しないようにする必要がある。  
    なお、C++ 標準規格では、ライブラリの各クラスは基底クラスを直接継承しなくても（間接的に継承していれば）良いことになっている。  
    このため、C++03 でも [`exception`](../../exception/exception.md) から直接派生していないかもしれないので、注意。  
    （当然 C++11 でも [`system_error`](../../system_error/system_error.md) を直接継承していない可能性がある）
- C++03 まではデストラクタが宣言されていたが、例外指定が誤っていたため（基底クラス [`exception`](../../exception/exception.md) のデストラクタには `throw()` が付いているため、派生クラスにも `throw()` が必要）、C++11 では宣言自体が削除された。


## バージョン
## 言語
- C++98

### 処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5.0, 3.6.0, 3.7.0, 3.8.0
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0, 4.9.1, 4.9.2, 5.1.0, 5.2.0, 6.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

### 備考
- GCC は 4.9.x までは C++11 モードでも [`system_error`](../../system_error/system_error.md) を継承していないので、注意が必要である。
- GCC 5.1.0 以降は現時点では `_GLIBCXX_USE_CXX11_ABI` マク�が `1` の場合（通常のビルドでは `1` がデフォルト）、C++03 モードでも C++11 モードでもライブラリ内から送出された例外を [`ios_base`](../ios_base.md)`::failure` 型では `catch` できない。  
    [`exception`](../../exception/exception.md) 型であれば `catch` することができるが、いずれにせよストリーム系の例外とそれ以外の例外を区別することができなくなってしまう。  
    したがって、少なくともこの問題が解決されるまでは、`_GLIBCXX_USE_CXX11_ABI` マク�を `0` にする他ないだろう。（C++03 モードにおける [コンストラクタ](failure/op_constructor.md)の事後条件の違いも参照）  
    なお、`_GLIBCXX_USE_CXX11_ABI` マク�を `0` にしてしまうと、4.9.x までと同様、モードにかかわらず [`system_error`](../../system_error/system_error.md) を継承しなくなってしまうので、注意すること。
- Clang では、C++03 モードでも [`strcmp`](../../cstring/strcmp.md.nolink)`(`[`what`](failure/what.md)`(), msg.`[`c_str`](../../string/basic_string/c_str.md)`()) == 0` にはならない。  


## 参照
- [`exception`](../../exception/exception.md)
- [`system_error`](../../system_error/system_error.md)
- [`io_errc`](../io_errc.md)
- [`iostream_category`](../iostream_category.md)
- [N2769 Detailed Reporting for Input/Output Library Errors (Revision 2)](http://www.open-std.org/JTC1/SC22/WG21/docs/papers/2008/n2769.htm)  
    基底クラスの変更を含む C++11 での提案文書
- [DR331 bad declaration of destructor for ios_base::failure](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#331)  
    デストラクタ宣言削除の Defect Report
- [Bug 66145 - [5/6 Regression] std::ios_base::failure objects thrown from libstdc++.so use old ABI](https://gcc.gnu.org/bugzilla/show_bug.cgi?id=66145)  
    GCC 5.1.0 以降でライブラリから送出された `ios_base::failure` が `catch` できない問題のバグレポート
