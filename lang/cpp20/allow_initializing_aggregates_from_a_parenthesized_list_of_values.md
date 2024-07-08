# 丸カッコの値リストからの集成体初期化を許可 [P0960R3]

* cpp20[meta cpp]

<!-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative_page)を参照してください。

<!-- last lang caution -->

## 概要

C++20では、波カッコと同様に丸カッコでも集成体初期化できる。

```cpp
struct A {
  int x,y;
};

A a(1, 2);
int n[](1, 2, 3, 4, 5);
```

ただし、今まで丸カッコでは書くことのなかった以下のような構文はサポートされない。

```cpp
A a = (1, 2);
int n[] = (1, 2, 3, 4, 5);
A aa[]((1, 2), (3, 4), (5, 6));
```

## 仕様

丸カッコによる集成体初期化は単に波カッコによる初期化に置き換わるわけではなく、意味論もコンストラクタ呼び出しに近くなっている。

* 波カッコによる初期化ではアップキャストになる場合を除いて型の暗黙変換ができないが、丸カッコによる初期化ではできる。
* 波カッコによる初期化では縮小変換ができないが、丸カッコによる初期化ではできる。
* 参照型のメンバへ一時オブジェクトをバインドするとき、波カッコによる初期化では寿命が延長されるが、丸カッコによる初期化では延長されない。

ただし、各要素は左から右に評価される。この点は波カッコと同じになっている。

```cpp
// P0960R3より引用
struct A {
  int a;
  int&& r;
};

int f();
int n = 10;

A a1{1, f()};               // OK, 寿命が延長される
A a2(1, f());               // well-formedだがダングリング参照
A a3{1.0, 1};               // エラー: 縮小変換はできない
A a4(1.0, 1);               // well-formedだがダングリング参照
A a5(1.0, std::move(n));    // OK
```
* P0960R3[link http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0960r3.html]

## 例
```cpp example
#include <iostream>

int main()
{
  struct A {
    int x,y;
  };

  A a(1, 2);
  int n[](1, 2, 3, 4, 5);
  std::cout << a.x << ',' << a.y << std::endl;
  for (int x : n) {
    std::cout << x << std::endl;
  }
}
```

### 出力
```
1,2
1
2
3
4
5
```

## この機能が必要になった背景・経緯

[一様初期化](/lang/cpp11/uniform_initialization.md)によって波カッコは集成体初期化にもコンストラクタ呼び出しにも使えるようになった。一方、丸カッコで集成体初期化をすることはできなかったので、波カッコと丸カッコでできることが異なってしまっていた。

当初は誰もが波カッコで初期化をするようになるから問題がないと考えられていたが、実際にはそうはなっていない。

メンバ変数を順番通りに引数で受け取り、初期化するだけのコンストラクタを考える。

```cpp
struct A {
  int x,y;
  constexpr A(int x, int y) noexcept : x{x}, y{y} {}
};
```

このクラスの場合はコンストラクタを定義せずとも波カッコによる集成体初期化が可能であるから、波カッコで初期化するのであればコンストラクタを定義する必要はない。
しかし、現実には丸カッコで初期化をしたいためにこのようなコンストラクタを書いてしまうことが多かった。

丸カッコで集成体初期化を可能にすることで両者の差はより少なくなり、コンストラクタを書かなければいけない場面もより少なくなる。
集成体初期化なのかコンストラクタ呼び出しなのかを意識せずに済むよう、丸カッコによる集成体初期化は丸カッコによるコンストラクタ呼び出しに近い意味論になっている。

また、この機能によって、集成体に対しても [`make_shared`](/reference/memory/make_shared.md)、[`make_unique`](/reference/memory/make_unique.md)、各種コンテナの `emplace`、[`allocator::construct`](/reference/memory/allocator/construct.md) などの関数が使えるようになる。

## 検討されたほかの選択肢

以下のような案もあったが採用されなかった。

1. 丸カッコによる集成体初期化を単純に波カッコに置き換えて解釈する([P0960R1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0960r1.html))
2. コンストラクタ呼び出しと全く同じ意味論にする(コンストラクタを自動生成して呼び出す)([P0960R2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0960r2.html))

丸カッコを単純に波カッコに置き換えて解釈すると、コンストラクタ呼び出しと同じ構文にもかかわらず意味論が異なり、混乱を招くという問題があった。

コンストラクタを自動生成する案では、次のようなコンストラクタを生成することが考えられた。

```cpp
explicit A(T1&& t1, … , Tk&& tk);
explicit A(T1 t1, … , Tk tk);
```

しかし、前者は参照型でないメンバーを左辺値で初期化することができない(関数テンプレートではないことに注意)。
後者はムーブが必要になってしまうという問題があった。

## <a id="relative-page" href="#relative-page">関連項目</a>

- [一様初期化](/lang/cpp11/uniform_initialization.md)

## 参照

- [P0960R3 Allow initializing aggregates from a parenthesized list of values](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0960r3.html)
- [C++ Core Guidelines ES.23: Prefer the {}-initializer syntax](https://github.com/isocpp/CppCoreGuidelines/blob/master/CppCoreGuidelines.md#es23-prefer-the--initializer-syntax) 常に波カッコで初期化することを推奨している。