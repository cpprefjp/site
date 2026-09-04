# 仮想関数への事前条件・事後条件の指定を許可 [P3097R3]
* cpp29[meta cpp]

<!-- start lang caution -->

このページはC++29に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++29では、[C++26の契約プログラミング](/lang/cpp26/contracts.md)で不適格とされていた、仮想関数への事前条件アサーション`pre`と事後条件アサーション`post`の指定ができるようになる。

```cpp
struct Car {
  virtual void drive(float speed)
    pre (speed <= 100);  // 速度を出しすぎない
};
```

派生クラス側でオーバーライドした関数のアサーションは、基本クラス側の関数のアサーションから独立しており、継承されない。派生クラス側で`pre`／`post`を指定しなければ、基本クラス側の指定とは無関係に、その関数にはアサーションが適用されない。派生クラス側には、基本クラス側より広い事前条件・狭い事後条件も、その逆も指定できる。

```cpp
struct HyperCar : Car {
  void drive(float speed) override
    pre (isCharged());  // Carのpre(speed <= 100)は継承されない。
                        // 充電済みであれば速度制限なしで運転できる
  void charge();
  bool isCharged() const;
};
```

そのうえで、基本クラスの参照やポインタを介した仮想関数呼び出しでは、実行時に基本クラス側と派生クラス側（実際に実行される関数）の両方のアサーションが評価される。たとえば`HyperCar`のオブジェクトを`Car&`参照を介して呼び出すと、`Car::drive()`の`pre(speed <= 100)`と`HyperCar::drive()`の`pre(isCharged())`の両方が評価される。

一方、`HyperCar`型のオブジェクトに対して直接呼び出すなど、多態的に呼び出さなかった場合は、基本クラス側のアサーションは評価されず、呼び出した関数自身のアサーションのみが評価される。


## 仕様
- 仮想関数にfunction-contract-specifier-seq（`pre`／`post`の並び）を指定することを不適格とする規定が削除される
- 関数呼び出しの事前条件アサーションは、以下の順に評価される
    1. 呼び出しが仮想関数呼び出しである場合、静的に選択された関数（呼び出し式で名前が指定された関数）の事前条件アサーション
    2. 実際に呼び出される関数（最終オーバーライダー）の事前条件アサーション
- 関数呼び出しの事後条件アサーションは、以下の順に評価される
    1. 実際に呼び出される関数の事後条件アサーション
    2. 呼び出しが仮想関数呼び出しである場合、静的に選択された関数の事後条件アサーション
- `x.Base::f()`のような修飾付きの呼び出しは仮想関数呼び出しではないため、その関数のアサーションのみが評価される
- メンバ関数ポインタを経由した呼び出しでは、ポインタにアサーションを関連付けられないため、実際に呼び出される関数のアサーションのみが評価される

仮想関数呼び出しで基本クラス側のアサーションが評価されるのは、派生クラス側の関数がそれを継承しているからではなく、呼び出しに基本クラス側の関数（静的に選択された関数）というインタフェースが使われたためである。したがって、派生クラス型のオブジェクトを直接呼び出した場合は、静的に選択された関数も派生クラス側の関数であるため、基本クラス側のアサーションは評価されない。

以下に、評価されるアサーションの組み合わせを示す（このコード例は規格の例に基づく）。

```cpp
struct X1 { virtual void f()         pre(a) post(b) {} };
struct X2 { virtual void f()         pre(c) post(d) {} };
struct Y : X1    { void f() override pre(e) post(f) {} };
struct Z : Y, X2 { void f() override pre(g) post(h) {} };

void t() {
  Z z;
  z.f();                        // g, h を評価
  static_cast<Y*>(&z)->f();     // e, g, h, f を評価

  X1& x1ref = z;
  X2& x2ref = z;
  x1ref.f();                    // a, g, h, b を評価
  x2ref.f();                    // c, g, h, d を評価
  x1ref.X1::f();                // a, b を評価

  void (X1::*pmf)() = &X1::f;
  (x1ref.*pmf)();               // g, h を評価
}
```


## 例
```cpp example
#include <iostream>

struct Car {
  virtual void drive(float speed)
    pre (speed <= 100);
};

void Car::drive(float) {
  std::cout << "Car::drive" << std::endl;
}

struct HyperCar : Car {
  void drive(float speed) override
    pre (isCharged());

  void charge() { charged = true; }
  bool isCharged() const { return charged; }
  bool charged = false;
};

void HyperCar::drive(float) {
  std::cout << "HyperCar::drive" << std::endl;
}

int main()
{
  HyperCar hyperCar;
  hyperCar.charge();

  // HyperCar::driveの事前条件はisCharged()のみ。
  // Car::driveのpre(speed <= 100)は継承されないため、120でも契約違反にはならない
  hyperCar.drive(120);

  // 基本クラスの参照を介した仮想関数呼び出しでは、基本クラス側Car::driveの
  // 事前条件と、派生クラス側HyperCar::driveの事前条件の両方が評価される
  Car& car = hyperCar;
  car.drive(90);
}
```

### 出力
```
HyperCar::drive
HyperCar::drive
```


## この機能が必要になった背景・経緯
実行時多態はC++の中核的なイディオムであり、EiffelやD、Adaといった契約アサーションを組み込みでもつ言語は、いずれも仮想関数（に相当する機能）と契約を統合している。C++の契約プログラミングでも仮想関数への対応は繰り返し提案されてきたが、設計上の問題が発見されるたびに合意が失われ、難航していた。

本提案の設計は一度はC++26の契約プログラミング (P2900) に統合されたものの、EiffelやDの確立されたモデル（事前条件は広げることのみ、事後条件は狭めることのみを許可し、オーバーライドされた関数のアサーションも常に適用するモデル）から乖離しているという懸念が解消できず、C++26では仮想関数への`pre`／`post`指定を全面的に禁止した状態で出荷することになった。

その後、ユースケースと設計空間の包括的な分析を経て、オーバーライドする関数のアサーションを独立とする本提案の設計が、既存のC++コードベースへの適用しやすさの点で適切であるという合意が再形成され、C++29に採用された。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++26 契約プログラミングをサポートする](/lang/cpp26/contracts.md)


## 参照
- [P3097R3 Contracts for C++: Virtual functions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3097r3.pdf)
