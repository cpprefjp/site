# 特殊化のアクセスチェック
* cpp20[meta cpp]

## 概要

クラス`C1`の内側で宣言されたクラス（ローカルクラス`impl`）が`private/protected`で宣言されている場合、テンプレートの文脈で`C1`の外側から`impl`を参照することは禁止されていた。しかし、実際にはほぼ全てのコンパイラでこれは許可されており、実際に使用されていた。

```cpp
template<class T>
struct trait;

class C1 {
  class impl; // クラス内ローカルクラス
};

// C++17まではill-formed、しかし実際にはほぼ全てのコンパイラでエラーにならなかった
// C++20からはok
template<>
struct trait<C1::impl>;
```

ただし、この`impl`がクラステンプレートになるとコンパイラによってはエラーとなっていた。

```cpp
class C1 {
  template<typename U>
  class impl{}; // クラス内ローカルクラステンプレート
};

// C++17まではill-formed、しかし一部のコンパイラではエラーにならなかった
// C++20からはok
template<>
struct trait<C1::impl>;
```

C++20からはこれらの場合の挙動が標準化され、アクセス指定に関わらずローカルクラスをその親クラスの外側からテンプレートの文脈で参照することが許可されるようになる。

## 仕様

1. 通常のアクセスチェックルールは、テンプレートの部分特殊化のテンプレート引数を指定する名前（非依存名）に対しては適用されない。
2. 通常のアクセスチェックルールは、明示的特殊化の宣言及び[明示的インスタンス化](/lang/cpp11/extern_template.md)内の名前に対しては適用されない。
    - 関数本体、デフォルト引数、基底クラスのリスト、メンバ宣言、列挙子宣言、静的メンバ変数、変数テンプレートの初期化子内の名前を除く

部分特殊化のテンプレート引数の依存名については、部分特殊化宣言時にはアクセスチェックされないが、部分特殊化の置換時にはチェックされる。

```cpp
class C {
  template<typename U>
  class impl{};
};

// プライマリテンプレート
template<typename T, typename U>
struct traits;

// 部分特殊化
template<typename T, typename U>
struct traits<C::impl<T>, U> {}; // ok、部分特殊化の宣言、インスタンス化時には依存名でなくなる

// 他のテンプレート
template<typename T>
struct S {
  traits<C::impl<T>, int> t;     // ng、Sのインスタンス化に伴って部分特殊化の置換が発生し、C::impl<T>は依存名なのでアクセスチェックが行われる
};


int main() {
  S<int> s;
}
```

## この機能が必要になった背景・経緯

冒頭で示した例は抽象的で出会うことは少なそうに思われるが、実際にはこのようなコードは範囲を表すクラスのイテレータ型の実装においてよく行われていた。

```cpp
template<typename V>
class my_view {
  template<typename T>
  class my_view_iterator;
};

template<typename T>
struct std::iterator_traits<my_view<int>::my_view_iterator<T>>;
```

このようなイテレータの実装方法はC++17以前にもよく行われており、C++20の`<ranges>`の一部の`view`型の実装においても行われる。これを放置すると、そのような`view`型ではポータブルかつ合法的に`std::iterator_traits`を使用することができなくなる。

そのため、C++20においてこの振る舞いを実装間で統一するために、テンプレートの文脈でプライベートローカルクラス（テンプレート）を参照することが許可された。

## 検討されたほかの選択肢
(執筆中)

## 参照

- [P0692R1 Access Checking on Specializations](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0692r1.html)

