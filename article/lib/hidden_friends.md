# Hidden Friends

クラスの定義内で`friend`として定義されている関数のことを*Hidden Friends*と呼ぶ。*Hidden Friends*な関数は通常のメンバ関数やグローバル関数の様に呼ぶことは出来ず、ADLでのみ呼び出すことができる。

```cpp
namespace NS {
  struct C {

    // メンバ関数
    void mem_func() {}

    // Hidden Friends
    friend void hidden_friend(C& self) {}
  };

  // 普通の非メンバ関数
  void free_func(C& c) {}
}

int main() {
  NS::C c{};

  // メンバ関数
  c.mem_func();           // ok
  mem_func(c);            // ng
  NS::mem_func(c);        // ng

  // Hidden friends
  c.hidden_friend();      // ng
  hidden_friend(c);       // ok
  NS::hidden_friend(c);   // ng

  // 普通の非メンバ関数
  c.free_func();          // ng
  free_func(c);           // ok
  NS::free_func(c);       // ok
}
```

C++20以降の標準ライブラリでは一部のカスタマイゼーションポイントの関数や演算子オーバーロードが*Hidden Friends*として定義される様になる。また、標準ライブラリの実装によっては*Hidden Friends*と規定されていない既存の演算子オーバーロードを*Hidden Friends*として定義していることがある。

## 利点

*Hidden Friends*はADL経由でしか呼べず、名前空間スコープに露出しておらずクラスのインターフェースにも含まれないという性質から次の様な利点がある。

- 暗黙変換による意図しない関数呼び出しの防止
- 名前空間スコープ汚染の抑止
- クラスインターフェース増加の抑止
- （名前空間スコープに定義する時と比較して）オーバーロード候補の減少によるコンパイル時間の削減
- メンバとして定義することができない一部の演算子オーバーロードでは宣言を簡素化できる

## Customization Point Object（CPO）とHidden Friends

あるクラスについてカスタマイゼーションポイントにアダプトする時には、そこで求められる名前でメンバ関数もしくは非メンバ関数を定義することが求められる。しかし、その関数がそのクラスのインターフェースの一部としてそぐわない事から、関数を*Hidden Friends*として定義する事が好まれる場合がある。そのため、多くのCPOは引数型に対して同名の*Hidden Friends*関数を探しに行くように定義されている。

## 参照
- [Hidden Friends - yohhoyの日記](https://yohhoy.hatenadiary.jp/entry/20190531/p1)
- [The Power of Hidden Friends in C++ - Just Software Solutions](https://www.justsoftwaresolutions.co.uk/cplusplus/hidden-friends.html)
- [P1965R0 Blanket Wording for Specifying “Hidden Friends”](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1965r0.pdf)
- [LWG Issue 3065 : LWG 2989 missed that all path's other operators should be hidden friends as well](https://cplusplus.github.io/LWG/issue3065)
