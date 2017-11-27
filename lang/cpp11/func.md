# 事前定義識別子\_\_func\_\_
* cpp11[meta cpp]

## 概要
C99互換として、事前定義識別子(predefined identifier)の`__func__`が導入された。

`__func__`には、現在いる関数名が文字列として格納されている。この識別子は、関数内でのみ使用できる。


## 仕様
識別子`__func__`は、事前定義された関数のローカル変数として定義され、以下のように暗黙に定義される：

```cpp
static const char __func__[] = "function-name";
```
* function-name[italic]

`"function-name"`には、実装定義の文字列が格納される。そのため、マングリングされた関数名、オーバーロード、名前空間、所属するクラスなどの扱いは、実装ごとに異なる可能性がある。多くの場合、`__func__`には関数の名前のみが格納され、名前空間名、クラス名、戻り値の型やパラメータといった情報は含まれない。


変数`__func__`が、プログラム内の他の変数と異なるアドレスを持っているかどうかは未規定。


## 備考
GCCは言語拡張として、`__FUNCTION__`識別子と`__PRETTY_FUNCTION__`識別子を持つ。`__FUNCTION__`は`__func__`の別名として定義される。`__PRETTY_FUNCTION__`は、名前空間名、クラス名、戻り値やパラメータといった情報も含む関数の文字列となる。

Visual C++は言語拡張として、`__FUNCTION__`識別子、`__FUNCDNAME__`識別子、`__FUNCSIG__`識別子を持つ。`__FUNCTION__`はスコープやシグニチャの情報を持たない関数名、`__FUNCDNAME__`はマングリングされた関数名、`__FUNCSIG__`は戻り値やパラメータといったシグニチャの情報を持つ関数名となる。


## 例
```cpp example
#include <iostream>

class S {
  const char* funcname_ = nullptr;
public:
  // コンストラクタでは、初期化子リストの時点から__func__を使用できる
  S()
    : funcname_(__func__) {}

  void print()
  {
    std::cout << "S::S() : " << funcname_ << std::endl;

    // メンバ関数名
    std::cout << "S::print() : " << __func__ << std::endl;
  }
};

void f()
{
  // 関数名
  std::cout << "f() : " << __func__ << std::endl;
}

// void g(const char* s = __func__) {}
// コンパイルエラー : __func__は関数内でのみ使用できる

int main()
{
  // main関数の名前
  std::cout << "main() : " << __func__ << std::endl;

  f();
  S().print();
}
```

### 出力例
```
main() : main
f() : f
S::S() : S
S::print() : print
```


## 検討されたほかの選択肢
`__func__`はクラスや名前空間といったスコープ全体の情報を持たないために、現在のクラス名を取得する`__class__`、現在の名前空間名を取得する`__namespace__`も検討された。しかし、これらはアイディアとして挙がったのみで、提案はされなかった。


## 参照
- [N1534 Proposed addition of `__func__` predefined identifier from C99](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2003/n1534.txt)
- [5.41 Function Names as Strings - GCC](https://gcc.gnu.org/onlinedocs/gcc-3.3.5/gcc/Function-Names.html)
- [Predefined Macros - MSDN](https://msdn.microsoft.com/library/b0084kay.aspx)

