#resize
```cpp
// C++03まで
void resize(size_type sz, const T& c = T());

// C++11から
void resize(size_type sz);
void resize(size_type sz, const T& c);
```

##概要

要素数を変更する


##効果

コンテナのサイズを`sz`に変更する。
もし`sz`が現在のコンテナの[`size()`](/reference/deque/size.md)より小さい場合、後方の[size()](/reference/deque/size.md)` - sz`個の要素を削除する。
もし`sz`が現在のコンテナの[size()](/reference/deque/size.md)より大きい場合、`sz - [size()](/reference/deque/size.md)`個だけオブジェクトcのコピーを追加する。1引数版の場合、値初期化されたオブジェクトのコピーが追加される。


##戻り値

なし


##例

```cpp
#include <iostream>
#include <deque>

int main()
{
  // 増加
  {
    std::deque<int> c = {3, 1, 4};
    c.resize(5);

    for (int x : c) {
      std::cout << x << std::endl;
    }
  }
  std::cout << std::endl;

  // 減少
  {
    std::deque<int> c = {3, 1, 4};
    c.resize(1);

    for (int x : c) {
      std::cout << x << std::endl;
    }
  }
}
```
* resize[color ff0000]
* resize[color ff0000]

###出力

```cpp
3
1
4
0
0

3
```

##参照


| | |
|---------------------------------------------------------------------------------------------|--------------------------|
| [`size`](/reference/deque/size.md) | 要素数を取得する |


