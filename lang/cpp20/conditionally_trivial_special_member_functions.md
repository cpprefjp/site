# 条件付きで特殊メンバ関数をトリビアルに定義するように [P0848R3]
* cpp20[meta cpp]

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

## 概要

クラスの特殊メンバ関数（コンストラクタ・代入演算子・デストラクタ）の`default`宣言をコンセプトによって制約することで、テンプレートパラメータの性質に応じて優先的に選択させることができる様になる。

```cpp
template<typename T>
struct wrap {
  T t;
  
  // 1. 制約されたdefaultなコピーコンストラクタ
  wrap(const wrap&) requires std::is_trivially_copy_constructible_v<T> = default;
  
  // 2. ユーザー定義コピーコンストラクタ
  wrap(const wrap&) {
    ...
  }
};
```

`T`が`std::is_trivially_copy_constructible`を満たす場合、1の宣言が選択され`wrap<T>`のコピーコンストラクタは`default`実装される（2のコンストラクタが選択されることは無い）。`T`が`std::is_trivially_copy_constructible`を満たさない場合、2の宣言が選択され`wrap<T>`のコピーコンストラクタはユーザー定義される（1のコンストラクタが選択されることは無い）。

特に、`T`がトリビアルコピー可能である場合にこの仕組みによって1のコンストラクタが選択されれば、（他の条件を満たしているものとして）`wrap<T>`もまたトリビアルコピー可能となる。トリビアル性に関する他の性質も同様に伝播することが可能となる。

## 仕様

次のいずれかの場合、2つの特殊メンバ関数は同種となる

1. 両方ともデフォルトコンストラクタ
2. 両方ともコピー/ムーブコンストラクタであり、最初の引数型が同じ
3. 両方ともコピー/ムーブ代入演算子であり、最初の引数型と参照・CV修飾が同じ

ある特殊メンバ関数が次の全てを満たす場合、それは資格のある（*eligible*）特殊メンバ関数となる

1. `delete`されていない
2. 関連制約がある場合（コンセプト機能により制約がなされている場合）、それが満たされている
3. 同種の特殊メンバ関数で、より制約されているものがない

次に、宣言されている全てのデストラクタはデストラクタ候補（*prospective destructor*）として扱われるようになる。そして、クラスの定義の最後（`};`が出現した場所と思って差し支えない）において、全てのデストラクタ候補の間で空の引数リストで呼び出す形でオーバーロード解決を実行し、そのクラスのデストラクタを選択する。

こうして選ばれたデストラクタの事を選択されたデストラクタ（*selected destructor*）とも呼ぶが、この選択されたデストラクタだけがそのクラスのデストラクタとなる（規格書中の他のすべての箇所で単にデストラクタ（*destructor*）と呼ばれるものは、この選択されたデストラクタの事を指す）。なお、何らかの理由でオーバーロード解決が失敗した場合、プログラムは不適格となる。

そして、あるクラスは次の条件を全て満たす場合にトリビアルコピー可能である

1. 少なくとも1つの、資格のあるコピーコンストラクタ、ムーブコンストラクタ、コピー代入演算子、またはムーブ代入演算子を持つ
2. それら資格のあるコピーコンストラクタ、ムーブコンストラクタ、コピー代入演算子、ムーブ代入演算子、はそれぞれすべてトリビアルである
3. トリビアルで削除されていないデストラクタ（選択されたデストラクタ）を持つ

また、あるクラスは次の条件をすべて満たす場合にトリビアルである

1. トリビアルコピー可能である
2. 1つ以上の資格のあるデフォルトコンストラクタを持つ
3. それらのデフォルトコンストラクタは全てトリビアルである

`default`宣言の扱いについては、選択されたデストラクタ以外の`default`指定されたデストラクタ候補は`delete`定義され、デストラクタ候補でも資格があるわけでもない`default`指定された特殊メンバ関数は`delete`定義される。

コンセプトによって制約された特殊メンバ関数があるとき、どれが使用されるか（オーバーロード解決）については通常の制約された関数と同じルールに従って選択される。そして、そのような特殊メンバ関数を持つ型のトリビアル性に関する性質については、特殊メンバ関数のオーバーロードのうち資格があるもの（デストラクタの場合は選択されたもの）によって決定される。

## 例

`std::optional<T>`の簡易実装を考える。デストラクタについて、要素型`T`が[`trivially_destructible`](/reference/type_traits/is_trivially_destructible.md)であるかどうかに応じて`optional<T>`のデストラクタのトリビアル性も切り替えたい場合、次のような実装になる

```cpp
// デストラクタがトリビアルでない場合のストレージ型
template<typename T, bool = std::is_trivially_destructible_v<T>>
struct optional_storage {
  union {
    char dummy;
    T data;
  };
  bool has_value = false;

  // デストラクタは常に非トリビアルでdeleteされているので定義する
  ~optional_storage() {
    if (has_value) {
      this->data.~T();
    }
  }
};

// デストラクタがトリビアルである場合のストレージ型
template<typename T>
struct optional_storage<T, true> {
  union {
    char dummy;
    T data;
  };
  bool has_value = false;

  // デストラクタはトリビアルであり常にdeleteされないので、宣言も不要
};

template<typename T>
class my_optional : private optional_storage<T> {
public:

  // 略
  ...

  // デストラクタ、この宣言も実はいらない
  ~my_optional() = default;
};
```

無効値と有効値でストレージを共有し、なおかつ遅延初期化等を行いながら動的確保や追加のストレージ消費を抑えるためには共用体を使用する。共用体の特殊メンバ関数はそのメンバ型のもつ特殊メンバ関数が1つでも非トリビアルであるならば対応する特殊メンバ関数が`delete`されるため、その場合はユーザーが定義しなければならない。しかしそれを一つの型の中で行うことができなかったため、このようにデストラクタの実装を行うレイヤにおいて型を分割する必要があった。

これをこの機能を用いて書き直すと、次のような実装になる

```cpp
template<typename T>
class my_optional {
  bool has_value = false;
  union {
    char dummy;
    T data;
  };

public:

  // 略
  ...

  // Tのデストラクタがトリビアルならばこちらが有効化
  ~my_optional() requires std::is_trivially_destructible_v<T> = default;

  // そうでないならばこちらが有効化
  ~my_optional() {
    this->reset();
  }
  
  // reset()の定義も同様の記法で分岐できる

  void reset() requires std::is_trivially_destructible_v<T> {
    this->has_value = false;
  }

  void reset() {
    if (this->has_value) {
      this->data.~T();
    }
    this->has_value = false;
  }
};
```

コンセプトによって`T`の（デストラクタの）トリビアル性に応じてデストラクタを選択できるようになるため、先ほどのような定義を分けるためのレイヤが不要になり、コード量を大きく削減することができる。

元の（この機能を使わない）実装に戻って、さらにコピーコンストラクタとムーブコンストラクタ、そしてコピー/ムーブ代入演算子についても同様に`T`のトリビアル性に応じて`default`とするかを切り替えることを考える。実装としてはデストラクタの時と同様に基底クラスにその判定と分岐を行うレイヤを追加して、そこで`T`の性質に応じた宣言（ユーザー定義/`default`定義）を記述していくことになるが、その総数はデストラクタのためのレイヤも含めて全5層に達し、実装はかなり複雑になる（このためここでは省略するが、この実装に興味がある場合、MSVC STLの[`xsmf_control.h`](https://github.com/microsoft/STL/blob/main/stl/inc/xsmf_control.h)およびこれを利用した`std::optional`/`std::variant`の実装が参考になると思われる）。

しかし、この機能を使用すると先ほどのデストラクタの場合と同様にそのような不要なレイヤを必要とすることなくシンプルに記述できる

```cpp example
#include <type_traits>
#include <string>

template<typename T>
class my_optional {
  bool has_value = false;
  union {
    char dummy;
    T data;
  };

public:

  // デフォルトコンストラクタ
  constexpr my_optional() 
    : has_value(false)
    , dummy{}
  {}

  // 値を受け取るコンストラクタ
  template<typename U=T>
  constexpr my_optional(U&& v)
    : has_value(true)
    , data(std::forward<U>(v))
  {}

  // トリビアルに定義できるならそうする
  my_optional(const my_optional& that) requires std::is_trivially_copy_constructible_v<T> = default;
  my_optional(my_optional&& that) requires std::is_trivially_move_constructible_v<T> = default;
  my_optional& operator=(const my_optional& that) requires std::is_trivially_copy_assignable_v<T> = default;
  my_optional& operator=(my_optional&& that) requires std::is_trivially_move_assignable_v<T> = default;
  ~my_optional() requires std::is_trivially_destructible_v<T> = default;


  // そうでない場合はユーザー定義する

  my_optional(const my_optional& that)
    : has_value(that.has_value)
    , dummy{}
  {
    if (that.has_value) {
      new (&this->data) T(that.data);
    }
  }

  my_optional(my_optional&& that)
    : has_value(that.has_value)
    , dummy{}
  {
    if (that.has_value) {
      new (&this->data) T(std::move(that.data));
    }
  }

  my_optional& operator=(const my_optional& that) {
    auto copy = that;
    *this = std::move(copy);
    
    return *this;
  }

  my_optional& operator=(my_optional&& that) {
    if (that.has_value) {
      if (this->has_value) {
        this->data = std::move(that.data);
      } else {
        new (&this->data) T(std::move(that.data));
      }
    } else {
      this->reset();
    }

    return *this;
  }

  ~my_optional() {
    this->reset();
  }
  
  // reset()の定義も同様の記法で分岐できる

  void reset() requires std::is_trivially_destructible_v<T> {
    this->has_value = false;
  }

  void reset() {
    if (this->has_value) {
      this->data.~T();
    }
    this->has_value = false;
  }
};

int main() {
  // int（全てのメンバ関数はトリビアル）の場合、my_optional<int>も同様になる
  static_assert(std::is_trivially_destructible_v<my_optional<int>>);
  static_assert(std::is_trivially_copy_constructible_v<my_optional<int>>);
  static_assert(std::is_trivially_move_constructible_v<my_optional<int>>);
  static_assert(std::is_trivially_copy_assignable_v<my_optional<int>>);
  static_assert(std::is_trivially_move_assignable_v<my_optional<int>>);
    
  // std::string（全てのメンバ関数は非トリビアル）の場合、my_optional<std::string>も同様になる
  static_assert(std::is_trivially_destructible_v<my_optional<std::string>> == false);
  static_assert(std::is_trivially_copy_constructible_v<my_optional<std::string>> == false);
  static_assert(std::is_trivially_move_constructible_v<my_optional<std::string>> == false);
  static_assert(std::is_trivially_copy_assignable_v<my_optional<std::string>> == false);
  static_assert(std::is_trivially_move_assignable_v<my_optional<std::string>> == false);
  
  // しかし、全ての特殊メンバ関数は利用可能（トリビアルでないだけ）
  static_assert(std::is_destructible_v<my_optional<std::string>>);
  static_assert(std::is_copy_constructible_v<my_optional<std::string>>);
  static_assert(std::is_move_constructible_v<my_optional<std::string>>);
  static_assert(std::is_copy_assignable_v<my_optional<std::string>>);
  static_assert(std::is_move_assignable_v<my_optional<std::string>>);
}
```

### 出力
```
```

## この機能が必要になった背景・経緯

例にあるように、C++17まで、`std::optional`のようにテンプレートパラメータで指定された型の値を保持するラッパクラス型において、その指定された型のトリビアル性を伝播するためには非常に複雑な実装を必要としていた。

C++20のコンセプトの導入によって、コンセプトによって特殊メンバ関数の宣言を選択することができるようになっていたものの、トリビアル性（特にトリビアルコピー可能性）の規格上の定義がそれを考慮したものになっておらず、コンセプトによる特殊メンバ関数の選択は仕様として完全なものではなかった。

この機能はそれを補うための仕組みであり、特殊メンバ関数に対するコンセプト制約自体は最初のコンセプト導入時から可能になっていたため、この機能は厳密にいえば仕様の調整のみである。

この機能は、C++23の`std::expceted`の実装で活用されるだろう。

## ## <a id="relative-page" href="#relative-page">関連項目</a>

- [コンセプト](./concepts.md)

## 参照

- [P0848R0 Conditionally Trivial Special Member Functions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0848r0.html)
- [P0848R3 Conditionally Trivial Special Member Functions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0848r3.html)
- [What is a "prospective destructor" in C++20? - stackoverflow](https://stackoverflow.com/questions/66055641/what-is-a-prospective-destructor-in-c20)
