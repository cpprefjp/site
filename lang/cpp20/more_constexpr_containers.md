# 可変サイズをもつコンテナのconstexpr化 [P0784R7]
* cpp20[meta cpp]

<!-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要

C++20より、定数式における動的メモリ確保と解放が許可される。それに伴い、`std::vector`と`std::string`の全メンバ関数が`constexpr`対応し、定数式で使用できるようになる。

```cpp
constexpr int test_vector() {
  std::vector<int> v = {5, 3, 2, 9, 1, 0, 4};
  v.push_back(11);

  int s{};
  for(auto n : v) {
    s += n;
  }

  return s;
}

constexpr bool check_cpp_file(const std::string& filename) {
  return filename.ends_with(".cpp") || filename.ends_with(".hpp");
}

static_assert(test_vector() == 35);         // OK
static_assert(check_cpp_file("main.cpp"));  // OK
```
* ends_with[link /reference/string/basic_string/ends_with.md]

これは主に以下の変更によって達成されている。

- デストラクタの`constexpr`対応
- `new/delete`式の`constexpr`対応
- `std::allocator/std::allocator_traits`の`constexpr`対応

## 仕様

### `constexpr`デストラクタ

デストラクタに`constexpr`を付加し、デストラクタを定数式で実行する事が可能となる。これはユーザー定義のデストラクタでも同様。

そのような`constexpr`デストラクタの本体、およびそのクラスの基底クラスと非静的メンバ変数の全てのデストラクタは定数式で実行可能でなくてはならない。

```cpp
struct C : base {

  // constexprデフォルトデストラクタ
  constexpr ~C() = default;

  // あるいは定義しても良い
  constexpr ~C() {
    // 何か定数式で可能な処理
    // ...
  }

  // 全ての基底クラスおよび非静的メンバ変数もまた定数式でデストラクト可能でなければならない
  int n;
  std::string str; 
};
```

`default`指定した時の振る舞いは、`constexpr`コンストラクタに`default`指定した時の振る舞いに準ずる。例えば、`default`デストラクタ（特に、トリビアルデストラクタ）はその処理が全て定数式で実行可能であるならば、暗黙的に`constexpr`である。

これに伴って、クラス型のリテラル型は`constexpr`デストラクタを持つ事が追加で要求されるようになる。そして、クラス型の`constexpr`変数は、その型がリテラル型で初期化が定数式で可能であり、かつデストラクタが定数式で実行可能でなくてはならなくなる。

C++17までは、クラス型のリテラル型はトリビアルデストラクタを要求されており、その`constexpr`オブジェクトは初期化が定数式で実行可能であることだけが要求されていた。そのため、C++17までのリテラル型はC++20においてもリテラル型であり、定数式での扱いは変わらない。

なお、クラスが仮想基底クラスを持つ時、デストラクタもコンストラクタも`constexpr`指定することはできない。

### `new/delete`式

定数式では未定義動作を可能な限り検出しコンパイルエラーとしなければならない。`operator new/operator delete`や`malloc/free`はその実行に伴ってポインタの再解釈（`void*`への/からのキャスト）が必要となるが、ポインタの再解釈は検出しづらい未定義動作に繋がりうるため定数式では禁止されている。

そのため、そのようなポインタの再解釈が発生しない動的メモリ確保機能である`new/delete`式がコンパイル時の動的メモリ確保・解放の方法として許可される。`new/delete`式は`operator new/operator delete`とは異なり、メモリの確保・解放とその領域のオブジェクト構築・破棄を一挙に行う言語機能である。

```cpp
constexpr int f() {
  // 確保と構築
  int* p = new int;

  *p = 20;
  int n = *p;

  // 破棄と解放
  delete p;

  return n;
}
```

当然ながら、`new/delete`式によって動的メモリ確保しようとする型はリテラル型であり、呼び出されるコンストラクタとデストラクタは共に定数式で実行可能でなければならない。

また、コンパイル時に実行される`new`式はグローバルのオーバーロード可能な[`operator new`](/reference/new/op_new.md)を呼び出すものでなくてはならない。そうではない`new`式の定数式における評価はコンパイルエラーとなる。

```cpp
struct S {
  int n = 10;
  
  // 仮に定数式で実行可能なように定義されていたとしても
  constexpr void* operator new(std::size_t n);
  constexpr void operator delete(void* p) noexcept;
};

constexpr int f() {
  S* s = new S{}; // NG、ユーザー定義operator newの呼び出し

  s->n = 20;
  int n = s->n;

  delete s;

  return n;
}
```

そして、コンパイル時に`new`式で確保されたメモリ領域は、コンパイル時に`delete`式によって解放されなければならない。その対応が取れていない`new/delete`式の呼び出しは、どちらもコンパイルエラーとなる。

```cpp
constexpr int f() {
  int* p = new int;

  *p = 20;
  int n = *p;

  // 忘れる
  //delete p;

  return n;
}

int main () {
  constexpr int n = f();  // NG、コンパイルエラー
}
```

したがって、C++20のコンパイル時動的メモリ確保の仕様では、コンパイル時に確保したメモリ領域を実行時へ持ち越すことはできない。

実際には、これらの定数式中の`new`式において呼び出される`::operator new()`の評価は常に省略されている。この省略はC++14より許可されている最適化の一環として行われ、スタック領域などのストレージを別途あてがうことで動的メモリ確保を避けるものである。対応する`delete`式における`::operator delete()`の呼び出しも同様に省略され、定数式における`new/delete`式はメモリの確保と解放が一貫していることのマーカーとしての側面が強くなっている。

```cpp
constexpr void f() {
  // このコードは定数式中で
  int* d = new int{2};
  delete d;

  // たとえば次のようなコードと等価になる
  int d{2};
}
```

実際にはどこのストレージが提供されるかは実装定義である。

### `std::allocator/std::allocator_traits`

標準ライブラリのコンテナ等は`new/delete`式を直接利用するわけではなく、`std::allocator_traits`を介して`std::allocator`を使用してメモリ確保・解放とオブジェクト構築・破棄を行う。`std::allocator/std::allocator_traits`も見かけ上はポインタの再解釈を必要とせずにそれを行うため、`std::allocator/std::allocator_traits`によるメモリ確保周りの機能もまた、コンパイル時の動的メモリ確保・解放の方法として許可される。

`std::allocator/std::allocator_traits`では`new/delete`式とは異なり、メモリの確保・解放（[`allocate`](/reference/memory/allocator/allocate.md)/[`deallocate`](/reference/memory/allocator/deallocate.md)）とその領域へのオブジェクト構築・破棄（[`construct`](/reference/memory/allocator_traits/construct.md)/[`destroy`](/reference/memory/allocator_traits/destroy.md)）の操作が複合していない。オブジェクト構築・破棄においては*placement new*と*pseudo-destructor call*が必要となるが、*placement new*はポインタの再解釈が必要となることから許可されず、そのために不必要であるので*pseudo-destructor call*も許可されない。

代わりに、*placement new*を行うライブラリ機能である[`construct_at`](/reference/memory/construct_at.md)を追加し、*pseudo-destructor call*を行う[`destroy_at`](/reference/memory/destroy_at.md)と共に`constexpr`を付加し定数式で使用可能とする。これらの関数は`void*`ではなく`T*`を取るため、これによってポインタ再解釈を回避しつつ*placement new*と*pseudo-destructor call*が定数式で使用可能となる。

そして、`std::allocator_traits`の`construct`と`destroy`は`construct_at/destroy_at`を呼び出して処理を行うように変更される。なお、これによって実行時の振る舞いが変化することはない。

```cpp
constexpr int f() {
  std::allocator<int> alloc{};

  // 確保と構築
  int* p = alloc.allocate(1);
  p = std::construct_at(p);

  *p = 20;
  int n = *p;

  // 破棄と解放
  std::destroy_at(p);
  alloc.deallocate();

  return n;
}
```

当然ながら、`std::allocator`によって動的メモリ確保しようとする型はリテラル型であり、`construct_at/destroy_at`によって呼び出されるコンストラクタとデストラクタは共に定数式で実行可能でなければならない。

また、`std::allocator<T>::allocate`が呼び出される場合は必ずその領域は`std::allocator<T>::deallocate`によって解放されていなければならず、`deallocate`と`construct_at`、`destroy_at`の引数の`T*`のポインタは`std::allocator<T>::allocate`によって確保された領域を指していなければならない。

```cpp
constexpr int f() {
  std::allocator<int> alloc{};

  // 確保と構築
  int* p = alloc.allocate(1);
  p = std::construct_at(p);

  *p = 20;
  int n = *p;

  // 忘れる
  //std::destroy_at(p);
  //alloc.deallocate();

  return n;
}

int main () {
  constexpr int n = f();  // NG、コンパイルエラー
}
```

すなわち、`new/delete`式と同様にコンパイル時に確保したメモリ領域を実行時へ持ち越すことはできない。

この規則はまた、`std::allocator/std::allocator_traits`によって確保され`construct_at`によってオブジェクトが構築された領域を`delete`式で解放する事、またはその逆も許可されない事を示している。

```cpp
constexpr int f() {
  std::allocator<int> alloc{};

  // 確保と構築
  int* p = alloc.allocate(1);
  p = std::construct_at(p);

  *p = 20;
  int n = *p;

  // 破棄と解放
  delete p; // NG、コンパイルエラー

  return n;
}

constexpr int g() {
  std::allocator<int> alloc{};

  // 確保と構築
  int* p = new int;

  *p = 20;
  int n = *p;

  // NG、コンパイルエラー
  std::destroy_at(p);
  alloc.deallocate();

  return n;
}
```

`destroy_at`には類似のファミリとして[`destroy_n`](/reference/memory/destroy_n.md)と、それらの`range`版があり（あるいは追加され）、`construct_at`も`range`版が同時に追加されるが、それらについても`construct_at/destroy_at`と同様の扱いが可能となる。

`std::allocator::allocate()`はグローバルの`::operator new()`を呼び出すが、この呼び出しは`new`式の時と同様に省略されており、`std::allocator::deallocate()`における`::operator delete()`の呼び出しも省略されている。この2つもまた`new/delete`式と同様に、メモリの確保と解放が一貫していることのマーカーとしての側面が強くなっている。

結局、C++20のコンパイル時動的メモリ確保は定数式にヒープ領域を導入するものではなく、デフォルトの`::operator new`による動的メモリ確保を別の領域をあてがう形に置換することで行われている。

## この機能が必要になった背景・経緯

`std::vector`をはじめとする可変サイズのコンテナは実行時に非常に有用であるため、同様に定数式においても有用である可能性があり、その必要性がC++コミュニティからも示されていた（[C++Now 2017: Ben Deane & Jason Turner "constexpr ALL the things!"](https://youtu.be/HMB9oXFobJc)、[P0810R0 constexpr in Practice](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0810r0.pdf)など）。

また、静的リフレクション機能の導入にあたっては、コンパイル時に使用可能な可変サイズコンテナおよび可変サイズの文字列型が必要となっていた。例えば、ある型のテンプレート引数をクエリするコードは次のようなものになる

```cpp
// 型Tのテンプレート引数の情報を取り出す
std::vector<std::metainfo> args = std::meta::get_template_args(reflexpr(T));
```

※ これは最終的なリフレクション仕様とは異なる可能性がある

これらの流れを受けて、`std::vector`と`std::string`を定数式で使用可能とするために、その最大の障壁となっていたメモリの動的確保と解放周りの機能が定数式で使用可能となった。

## 検討されたほかの選択肢

当初検討されていた仕様では、コンパイル時に確保したメモリ領域を実行時に持ち越すことが可能だった。そのようなメモリ領域の確保と解放はクラス型の内部で閉じている必要はあったが、その条件を満たせば静的ストレージに昇格され実行時環境から参照できるようになる。

しかし、当初のアプローチには2つの問題があった。

実行時に持ち越されるメモリ領域を管理するクラスであってもそのデストラクタでその領域を解放している事が求められていたが、それはコンパイラによるテスト要件であり実行時に領域を持ち越そうとする時、実際にそのデストラクタがコンパイル時に呼ばれることはない。しかしその場合、静的ストレージに昇格される領域の内容はいつどの時点のものが保持されるのかが不透明となる。

当初の仕様ではそれに対処するために、`std::mark_immutable_if_constexpr()`という関数を導入し、この関数に領域へのポインタを渡して呼び出すことでコンパイラへのマーカーとし、呼ばれた時点でのメモリ領域を実行時に持ち越すアプローチをとっていた。

```cpp
template<typename T>
struct sample {
  std::allocator<T> m_alloc;
  T* m_p;
  size_t m_size;

  // 非トリビアルconstexprコンストラクタでメモリ領域を確保
  template<size_t N>
  constexpr sample(T(&p)[N])
    : m_alloc{}
    , m_p{m_alloc.allocate(N)}
    , m_size{N}
  {
    for(size_t i = 0; i < N; ++i) {
      std::construct_at(m_p + i, p[i]);
    }

    // 実行時に持ち越す領域をコンパイラに伝える
    // ここ以降は確保した領域は不変
    std::mark_immutable_if_constexpr(m_p);
  }

  // constexprデストラクタでメモリ領域を解放
  constexpr ~sample() {
    for(size_t i = 0; i < N; ++i) {
      std::destroy_at(m_p + i);
    }
    m_alloc.deallocate(m_p, m_size);
  }
};

constexpr sample<char> str{"Hello."};
// 実行時、strは"Hello"を保持する静的配列を参照するようになる
```

2つ目の問題は、コンパイル時に確保された領域は実行時に`const`であり書き換えられてはならないが、クラス型の`const`伝播の問題から書き換えが可能となってしまっていたことである。

```cpp
// 当初の仕様ではOK（unique_ptrがconstexpr対応した場合）
constexpr std::unique_ptr<std::unique_ptr<int>> uui 
  = std::make_unique<std::unique_ptr<int>>(std::make_unique<int>());

int main() {
  std::unique_ptr<int>& ui = *uui; // これができてしまう
  ui.reset(); // 静的ストレージの領域をdeleteする？
}
```

`std::unique_ptr`ではそれ自身の`const`性が内部のポインタの参照するオブジェクトまで伝播しないため、コンパイル時に確保されたメモリ領域を参照するような`std::unique_ptr`からは、可変な参照を取得できてしまう。上記例のように`std::unique_ptr`がネストしていれば、そのような領域を`delete`することもできてしまっていた。

これらの問題について、`std::mark_immutable_if_constexpr()`によるアプローチを標準化委員会が嫌ったことと、2つ目の問題の解決が簡単ではなかった（時間がかかり得た）事から、コンパイル時に確保したメモリを実行時に持ち越すことについてはC++20への導入を見送ることとなった。

## <a id="relative-page" href="#relative-page">関連項目</a>

- [動的メモリ確保の省略の許可](/lang/cpp14/clarifying_memory_allocation.md)
- [`allocator`](/reference/memory/allocator.md)
- [`allocator_traits`](/reference/memory/allocator_traits.md)
- [`construct_at`](/reference/memory/construct_at.md)
- [`destroy_at`](/reference/memory/destroy_at.md)
- [`destroy_n`](/reference/memory/destroy_n.md)
- [`vector`](/reference/vector/vector.md)
- [`basic_string`](/reference/string/basic_string.md)

## 参照
- [P0784R2 More constexpr containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0784r2.html)
- [P0784R3 More constexpr containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0784r3.html)
- [P0784R4 More constexpr containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0784r4.html)
- [P0784R5 More constexpr containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0784r5.html)
- [P0784R6 More constexpr containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0784r6.html)
- [P0784R7 More constexpr containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0784r7.html)
- [動的メモリー確保 - 江添亮の入門C++](https://ezoeryou.github.io/cpp-intro/#動的メモリー確保)
- [N3664 Clarifying Memory Allocation](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3664.html)
- [P1974R0 Non-transient constexpr allocation using propconst](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p1974r0.pdf)
