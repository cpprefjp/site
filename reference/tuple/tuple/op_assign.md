#operator= (C++11)
* tuple[meta header]
* std[meta namespace]
* tuple[meta class]
* function[meta id-type]

```cpp
tuple& operator=(const tuple&);
tuple& operator=(tuple&&) noexcept(下記参照);

template <class... UTypes>
  tuple& operator=(const tuple<UTypes...>&);

template <class... UTypes>
  tuple& operator=(tuple<UTypes...>&&);

template <class U1, class U2>
  tuple& operator=(const pair<U1, U2>&);

template <class U1, class U2>
  tuple& operator=(pair<U1, U2>&&);
```
* pair[link /reference/utility/pair.md]

##概要

- `tuple& operator=(const tuple&)`

コピー代入を行う。 
要件： `tuple`の全ての要素型`i`が[`is_copy_assignable`](/reference/type_traits/is_copy_assignable.md)`<i>::value == true`であること

- `tuple& operator=(tuple&&) noexcept(下記参照 )`

ムーブ代入を行う。 
要件： `tuple`の全ての要素型`i`が[`is_move_assignable`](/reference/type_traits/is_move_assignable.md)`<i>::value == true`であること。 
例外： `tuple`の全ての要素型`i`が`is_nothrow_move_assignable<i>::value == true`の場合、決して例外を投げない。

- `template <class... UTypes>`<br/>`tuple& operator=(const tuple<UTypes...>&)`

変換可能な`tuple`からのコピー代入を行う。 
要件： パラメータの`tuple`の全ての要素型が、元の`tuple`の全ての要素型にコピー代入可能であり、要素数が同じであること。

- `template <class... UTypes>`<br/>`tuple& operator=(tuple<UTypes...>&&)`

変換可能な`tuple`からのムーブ代入を行う。 
要件： パラメータの`tuple`の全ての要素型が、元の`tuple`の全ての要素型にムーブ代入可能であり、要素数が同じであること。

- `template <class U1, class U2>`<br/>`tuple& operator=(const pair<U1, U2>&)`

変換可能な`pair`からのコピー代入を行う。 
要件： 元の`tuple`の要素数が2であり、パラメータの`pair`の全ての要素型が元の`tuple`の全ての要素型にコピー代入可能であること。

- `template <class U1, class U2>`<br/>`tuple& operator=(pair<U1, U2>&&)`

変換可能な`pair`からのムーブ代入を行う。 
要件： 元の`tuple`の要素型が2であり、パラメータの`pair`の全ての要素型が元の`tuple`の全ての要素型にムーブ代入可能であること。


##例
```cpp
#include <string>
#include <tuple>

int main()
{
  // コピーコンストラクタ
  {
    std::tuple<int, char, std::string> t1(1, 'a', "hello");
    std::tuple<int, char, std::string> t2 = t1;
  }

  // ムーブコンストラクタ
  {
    std::tuple<int, char, std::string> t = std::tuple<int, char, std::string>(1, 'a', "hello");
  }

  // 変換可能なタプルからのコピー構築
  {
    std::tuple<int, char, const char*> t1(1, 'a', "hello");
    std::tuple<int, char, std::string> t2 = t1;
  }

  // 変換可能なタプルからのムーブ構築
  {
    std::tuple<int, char, std::string> t = std::make_tuple(1, 'a', "hello");
  }

  // 変換可能なpairからのコピー構築
  {
    std::pair<int, char> p(1, 'a');
    std::tuple<int, char> t = p;
  }

  // 変換可能なpairからのムーブ構築
  {
    std::tuple<int, char> t = std::make_pair(1, 'a');
  }
}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): 
- [Visual C++](/implementation.md#visual_cpp) 


##参照


