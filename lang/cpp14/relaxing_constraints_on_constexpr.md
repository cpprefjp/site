#constexprの制限緩和
* cpp14[meta cpp]

##概要
C++11で、汎用定数式の機能である[`constexpr`](/lang/cpp11/constexpr.md)が導入された。

`constexpr`関数には、コードの表現として強い制限があった。C++14では、以下のような制限緩和が行われた。

- 変数宣言を許可
- `if`文と`switch`文を許可
- 全てのループ文を許可(`for`文、範囲`for`文、`while`文、`do-while`文)
- 変数の書き換えを許可
- 戻り値型(リテラル型)として、`void`を許可
- `constexpr`非静的メンバ関数の、暗黙の`const`修飾を削除


##仕様
###`constexpr`関数内での変数宣言を許可

以下の例で示すように、`constexpr`関数内で変数を宣言できるようになった。

```cpp
constexpr int f()
{
  int result = 0; // OK
                  // 関数f()自体がconstexprであるため、
                  // 変数resultはconstexprである必要はない。
  return result;
}
```

ただし、

- `static`／`thread_local`記憶域の変数宣言は許可されない。
- 未初期化変数の宣言は許可されない。


###`constexpr`関数内での条件分岐として、`if`文と`switch`文を許可

以下の例で示すように、`constexpr`関数内での条件分岐に、`if`文を使用できるようになった。`else`節も使用でき、`else`節を省略してもよい。

```cpp
constexpr int abs(int x)
{
  if (x < 0) // OK
    return -x;
  return x;
}
```

また、`switch`文も使用できるようになった。

```cpp
enum class Weekday { Sun, Mon, Tue, };
constexpr Weekday intToWeekday(int n)
{
  switch (n) {
    case 0: return Weekday::Sun;
    case 1: return Weekday::Mon;
    case 2: return Weekday::Tue;
    default: break;
  }
  throw std::out_of_range("n is out of week");
}
```

ただし、`goto`文は許可されない。


###`constexpr`関数内で、全てのループ文を許可

ループ文として、`for`文、範囲`for`文、`while`文、`do-while`文が許可された。

```cpp
constexpr int f()
{
  int x = 0;

  // OK : for文
  for (int i = 0; i < 5; ++i) {
    x += i + 1;
  }

  // OK : 範囲for文
  int ar[] = {6, 7, 8};
  for (const int& i : ar) {
    x += i;
  }

  // OK : while文
  while (true) {
    x += 9;
    break;
  }

  // OK : do-while文
  do {
    x += 10;
  }
  while (false);

  return x;
}
```


###`constexpr`関数内での、変数の書き換えを許可
`constexpr`関数内において、ローカル変数、またはその関数が所属するクラスの非静的メンバ変数の書き換えが許可された。

```cpp
constexpr int square(int x)
{
  x *= x; // OK : ローカル変数は書き換えてもよい
  return x;
}
```

```cpp
struct X {
  int x;

  constexpr X(int x)
    : x(x) {}

  constexpr int square()
  {
    x *= x; // OK : 非静的メンバ変数も書き換えられる
    return x;
  }
};

constexpr int square(int n)
{
  X x(n);
  return x.square();
}
```


###`constexpr`関数の戻り値型として、`void`を許可
`constexpr`関数での、パラメータの型、および戻り値の型は、[リテラル型](/reference/type_traits/is_literal_type.md)に分類される型に限定される。

C++14では、[リテラル型](/reference/type_traits/is_literal_type.md)に分類される型に、`void`が追加された。

これにより、`constexpr`関数の戻り値型を`void`とし、非`const`参照のパラメータを書き換えて結果を返す、という操作が許可された。

```cpp
constexpr void square(int& x)
{
  x *= x;
}

constexpr int f(int x)
{
  square(x);
  return x;
}
```


###`constexpr`非静的メンバ関数の、暗黙の`const`修飾を削除
C++11では、`constexpr`非静的メンバ関数は、暗黙で`const`が付けられ、明示的に`const`を付けることもできなかった：

```cpp
struct X {
  constexpr int f(); // これは以下と同じ
//constexpr int f() const;
};
```

C++14ではこの仕様が削除され、`const`か非`const`かを、明示的に指定することになった。

※この変更によって、既存コードの互換性は壊れない。


##この機能が必要になった背景・経緯
C++は直交性を重視して設計されており、直接関係ない機能同士を組み合わせて使用できる。しかし、C++11での`constexpr`は、その制限によって、ほかの機能(インスタンス、`for`ループ、変数書き換え、例外等)とうまく組み合わせられなかった。

これらの制限を回避するために表現力を犠牲にしなければならず、プログラマをいらつかせていた。

C++14では、`constexpr`関数、`constexpr`メンバ関数、暗黙の`const`といった制限を緩和する。


##関連項目
- [constexpr](/lang/cpp11/constexpr.md)


##参照
- [N3597 Relaxing constraints on `constexpr` functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3597.html)
- [N3598 `constexpr` member functions and implicit `const`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3598.html)
- [N3652 Relaxing constraints on `constexpr` functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3652.html)

