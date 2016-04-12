#noexcept
* cpp11[meta cpp]

##概要
C++11で導入された`noexcept`キーワードには、以下の2つの意味がある：

ひとつは、`throw`キーワードによる例外仕様の代替。関数がどの例外を送出する可能性があるかを列挙するのではなく、例外を送出する可能性があるかないかのみを指定する。例外を送出する可能性がある関数には`noexcept(false)`を指定し、例外を送出する可能性がない関数には`noexcept(true)`もしくは`noexcept`を指定する：

```cpp
class Integer {
  int value_ = 0;

public:
  // getValue()メンバ関数は、例外を送出しない
  int getValue() const noexcept
  {
    return value_;
  }
};
```

`noexcept`キーワードのもうひとつの意味は、式が例外を送出する可能性があるかどうかを判定する演算子である。`noexcept(f(arg))`のように`noexcept`演算子に式を指定することで、その式が例外を送出する可能性があるかどうかを、コンパイル時定数の`bool`値として取得できる。つまり、関数に対して指定された`noexcept`の情報を取得する：

```cpp
Integer x;
static_assert(noexcept(x.getValue()), "getValue() function never throw exception");
```
* static_assert[link static_assert.md]

`noexcept`は、代表的には以下の2つの用途で使用できる：

1. パフォーマンス向上
    - 例外を送出しないという保証があることで、コンパイラは例外送出によるスタック巻き戻しのためのスタックを確保する必要がなくなる
2. 例外を決して送出しない強い例外安全性の保証(No-throw guarantee)
    - 例外安全性で有名な問題として`stack`の`pop`操作がある。要素型`T`のコピーコンストラクタが例外を送出する可能性があるために`pop`の関数は`T`を返すのではなく戻り値型`void`とする必要があった。しかし`return`文に指定する式が決して例外を送出しないという保証があることで、`pop`の関数は`T`型のオブジェクトを返せるようになる。
    - 参照： [ジェネリックコンポーネントにおける例外安全性 - boostjp](http://boostjp.github.io/archive/boost_docs/document/generic_exception_safety.html)


##仕様
###例外仕様としてのnoexcept
- 例外仕様としての`noexcept`には、整数定数式を引数として指定できる。整数定数式は、`bool`に変換可能であること。
- `noexcept`例外仕様に対して`false`に評価される整数定数式を指定した関数は、あらゆる例外を送出する可能性がある。
- `noexcept`例外仕様に対して`true`に評価される整数定数式を指定した関数、もしくは引数なしで`noexcept`を指定した関数は、いかなる例外も送出してはならない。
- `noexcept`例外仕様を指定しない関数は、一部の例外を除いて、`noexcept(false)`を意味する。
    - デストラクタと`delete`演算子は、明示的に`noexcept(falseに評価される整数定数式)`を指定しない限り、デフォルトで`noexcept`である。

```cpp
struct X {
  ~X(); // デストラクタはデフォルトでnoexcept(true)

  // 例外を送出する可能性がある
  // ※ std::vectorのコピーコンストラクタは例外を送出する
  std::vector<T> getVector() const;
//std::vector<T> getVector() const noexcept(false);

  // 例外を送出しない
  int getValue() const noexcept;
//int getValue() const noexcept(true);
};
```
* noexcept[color ff0000]
* std::vector[link /reference/vector.md]

- `noexcept`もしくは`noexcept(trueに評価される整数定数式)`が指定された関数が例外を送出した場合、[`std::terminate()`](/reference/exception/terminate.md)関数を呼び出してプログラムを異常終了させる。その際、[`std::terminate()`](/reference/exception/terminate.md)関数が呼び出される前に、スタックの巻き戻しは起こらない可能性がある。
- 従来の`throw`キーワードによる例外仕様(C++03ではexception specification、C++11ではdynamic exception specificationと呼ばれる仕様)は、C++11以降で非推奨である。


###式が例外を送出する可能性があるか判定するnoexcept演算子
- 演算子としての`noexcept`は、引数として指定した定数式が例外を送出する可能性があるかどうかをコンパイル時に判定し、`bool`型の定数値を返す

```cpp
struct X {
  int f() const noexcept; // noexcept例外仕様

  // 外側はnoexcept例外仕様、内側はnoexcept演算子。
  // メンバ関数関数f()が例外を送出しない場合、関数g()もまた例外を送出しない
  int g() const noexcept(noexcept(f())
  { return f(); }
};

X x;
// X::f()メンバ関数が例外を送出しない場合、
// isNoexprFはtrue、そうでなければfalseとなる
constexpr bool isNoexprF = noexcept(x.f());
```

- この演算子は`sizeof`や[`decltype`](decltype.md)と同じく、引数として指定された式は、実行時には評価されない
    - 上記コードの場合、`x.f()`は実行時には呼び出されない
- `noexcept`演算子は、以下の状況で`false`を返す：
    - `noexcept(true)`もしくは`noexcept`が指定されていない関数、メンバ関数、関数ポインタ、メンバ関数ポインタの呼び出し。(例として、`new`式からの確保関数の呼び出しといった、暗黙の呼び出し)
    - `throw`式
    - 実行時型チェックが行われる式として、参照型を引数とする`dynamic_cast`式の呼び出し、および多態的に振る舞う型の左辺値に対する`typeid`式の呼び出し


##例
```cpp
#include <iostream>
#include <stack>
#include <deque>
#include <type_traits>

template <class T, class Container = std::deque<T>>
class movable_stack : public std::stack<T, Container> {
  using base = std::stack<T, Container>;
 
  static_assert(std::is_nothrow_default_constructible<T>{},
                "T must be nothrow default constructible");
  static_assert(std::is_nothrow_move_constructible<T>{},
                "T must be nothrow move constructible");

public:
  // クラスのテンプレートパラメータTに対して、
  // ムーブコンストラクタが例外を送出しないことを要求しているので、
  // pop操作は例外を送出することなくreturnで要素を返せる。
  std::pair<T, bool> move_pop() noexcept
  {
    if (base::empty()) {
      return std::make_pair(T(), false);
    }

    T x = std::move(base::top());
    base::pop();
    return std::make_pair(std::move(x), true);
  }
};

int main()
{
  movable_stack<int> s;
  s.push(1);
  s.push(2);
  s.push(3);

  while (!s.empty()) {
    int next_value = s.move_pop().first;
    std::cout << next_value << std::endl;
  }
}
```
* std::stack[link /reference/stack.md]
* std::deque[link /reference/deque.md]
* std::is_nothrow_default_constructible[link /reference/type_traits/is_nothrow_default_constructible.md]
* std::is_nothrow_move_constructible[link /reference/type_traits/is_nothrow_move_constructible.md]
* static_assert[link static_assert.md]
* std::move[link /reference/utility/move.md]
* base::empty()[link /reference/stack/empty.md]
* base::top()[link /reference/stack/top.md]
* base::pop()[link /reference/stack/pop.md]
* std::pair[link /reference/utility/pair.md]
* std::make_pair[link /reference/utility/make_pair.md]
* s.push[link /reference/stack/push.md]
* s.empty()[link /reference/stack/empty.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

###出力
```
3
2
1
```

##この機能が必要になった背景・経緯
`noexcept`機能は、ムーブコンストラクタから例外を送出することを許可する際に提案された。

ムーブ操作は基本的には例外を送出しない。そのため、例外を送出しないという、例外安全性の強い保証がしやすい仕組みと言える。ムーブに例外を送出しない保証があれば、より最適化された実装を選択できるだろう。しかし、ムーブ操作が例外を送出する可能性があるのであれば、例外を送出しないムーブ操作のための最適化された実装とそれ以外を呼び分ける仕組みが必要となる。

そういった例外を送出しない判定や指定は、従来の`throw`キーワードによる例外仕様の範囲を超えていた。そのために、`noexcept`という機能が新設され、その機能で必要十分となったために従来の例外仕様は非推奨となった。


##関連項目
- [標準ライブラリにおける、関数に`noexcept`を付けない条件](/article/lib/dont_use_noexcept.md)
- [`move_if_noexcept`](/reference/utility/move_if_noexcept.md)
- [`is_nothrow_constructible`](/reference/type_traits/is_nothrow_constructible.md)
- [`is_nothrow_default_constructible`](/reference/type_traits/is_nothrow_default_constructible.md)
- [`is_nothrow_copy_constructible`](/reference/type_traits/is_nothrow_copy_constructible.md)
- [`is_nothrow_move_constructible`](/reference/type_traits/is_nothrow_move_constructible.md)
- [`is_nothrow_assignable`](/reference/type_traits/is_nothrow_assignable.md)
- [`is_nothrow_copy_assignable`](/reference/type_traits/is_nothrow_copy_assignable.md)
- [`is_nothrow_move_assignable`](/reference/type_traits/is_nothrow_move_assignable.md)
- [`is_nothrow_destructible`](/reference/type_traits/is_nothrow_destructible.md)


##参照
- [N3050 Allowing Move Constructors to Throw (Rev. 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3050.html)
- [N3166 Destructors default to `noexcept`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3166.html)
- [N3167 Delete operators default to `noexcept`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3167.html)
- [N3204 Deducing "`noexcept`" for destructors](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3204.htm)
- [N3205 Delete operators default to `noexcept`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3205.htm)
- [N3103 Security impact of `noexcept`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3103.pdf)
- [ムーブによるpop - Faith and Brave - C++で遊ぼう](http://faithandbrave.hateblo.jp/entry/20130604/1370327651)

