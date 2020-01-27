# exchange
* utility[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp14[meta cpp]

```cpp
namespace std {
  template <class T, class U=T>
  T exchange(T& obj, U&& new_val);           // C++14

  template <class T, class U=T>
  constexpr T exchange(T& obj, U&& new_val); // C++20
}
```

## 概要
値を書き換え、書き換え前の値を返す。


## 効果
第1パラメータ`obj`で受け取った変数への参照に、第2パラメータ`new_val`の値をムーブ代入し、代入前の`obj`の状態を返す。

以下と�価の効果を持つ：

```cpp
T old_val = std::move(obj);
obj = std::forward<U>(new_val);
return old_val;
```
* std::move[link move.md]
* std::forward[link forward.md]


## 戻り値
この関数を呼び出す前の、第1パラメータ`obj`の状態を返す。


## 備考
この関数は、[`std::atomic_exchange()`](/reference/atomic/atomic_exchange.md)関数の経験から導入された。


## 例
```cpp example
#include <iostream>
#include <utility>

int main()
{
  int state = 1;
  int before = std::exchange(state, 2);

  std::cout << "state : " << state << std::endl;
  std::cout << "before : " << before << std::endl;
}
```
* std::exchange[color ff0000]

### 出力
```
state : 2
before : 1
```


## コンテナを出力する例
```cpp example
#include <iostream>
#include <utility>
#include <vector>

template <class T>
void print_1(const std::vector<T>& v)
{
  // カンマ区切りでvectorを出力する。
  // 区切り文�は、各要素の後ではなく、前に置くと考える。
  // 最初の要素のみ区切り文�を出力しない。

  bool first = true;

  std::cout << '{';
  for (const T& x : v) {
    if (!std::exchange(first, false)) {
      std::cout << ',';
    }
    std::cout << x;
  }
  std::cout << '}' << std::endl;
}

// 別な書き方
template <class T>
void print_2(const std::vector<T>& v)
{
  const char* delimiter = "";

  std::cout << '{';
  for (const T& x : v) {
    std::cout << std::exchange(delimiter, ",") << x;
  }
  std::cout << '}' << std::endl;
}


int main()
{
  const std::vector<int> v = {1, 2, 3};
  print_1(v);
  print_2(v);
}
```
* std::exchange[color ff0000]

### 出力
```
{1,2,3}
{1,2,3}
```

## バージョン
### 言語
- C++14

### 処理系
- [GCC](/implementation.md#gcc): 4.9.0
- [Clang](/implementation.md#clang): 3.4
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2015

## 関連項目

- [非推奨だった bool 型に対するインクリメント演算�を削除](/lang/cpp17/remove_deprecated_increment_of_bool.md)

## 参照
- [N3511 exchange() utility function](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3511.html)
- [N3608 exchange() utility function, revision 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3608.html)
- [N3668 exchange() utility function, revision 3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3668.html)
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
