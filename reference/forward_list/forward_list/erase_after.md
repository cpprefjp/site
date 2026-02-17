# erase_after
* forward_list[meta header]
* std[meta namespace]
* forward_list[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
iterator
  erase_after(const_iterator position); // (1) C++11
constexpr iterator
  erase_after(const_iterator position); // (1) C++26

iterator
  erase_after(const_iterator position,
              const_iterator last); // (2) C++11
constexpr iterator
  erase_after(const_iterator position,
              const_iterator last); // (2) C++26
```

## 概要
指定されたイテレータの次の要素をコンテナから削除する


## 要件
第1引数`position`の次が間接参照可能なイテレータであること

- (1) : `position`イテレータが指す次の要素単体を削除する
- (2) : イテレータ範囲`(position, last)`の要素を削除する


## 効果
- (1) : `position`が指す次の要素が削除される
- (2) : イテレータ範囲`(position, last)`の要素が削除される


## 戻り値
削除された要素の次の要素を指すイテレータを返す。そのような要素が存在しない場合は、[`end()`](end.md)を返す。


## 例外
投げない


## 計算量
削除される要素の数と同じ回数の`T`のデストラクタが実行される。


## 例
### 基本的な使い方 (C++11)
```cpp example
#include <iostream>
#include <forward_list>
#include <iterator>

int main()
{
  // 1引数版
  {
    // 4を削除
    std::forward_list<int> ls = {1, 2, 3, 4, 5};
    ls.erase_after(std::next(ls.before_begin(), 3));
    for (int x : ls) { std::cout << x << ' '; }

    std::cout << std::endl;

    // 先頭要素を削除
    ls = {1, 2, 3, 4, 5};
    ls.erase_after(ls.before_begin());
    for (int x : ls) { std::cout << x << ' '; }
  }
  std::cout << std::endl;

  // 2引数版
  {
    std::forward_list<int> ls = {1, 2, 3, 4, 5};

    // 3以降を削除
    ls.erase_after(std::next(ls.before_begin(), 2), ls.end());

    for (int x : ls) { std::cout << x << ' '; }
  }
  std::cout << std::endl;
}
```
* erase_after[color ff0000]
* ls.before_begin()[link before_begin.md]
* ls.end()[link end.md]

#### 出力
```
1 2 3 5 
2 3 4 5 
1 2 
```


### イテレート中に要素を削除する (C++11)
```cpp example
#include <iostream>
#include <forward_list>

int main()
{
  std::forward_list<int> ls = {3, 1, 4};

  // イテレート中に要素削除をするような場合には、
  // 範囲for文は使用できない
  for (auto it = ls.before_begin();;) {
    auto next = std::next(it);
    if (next == ls.end())
      break;

    // 条件一致した要素を削除する
    if (*next == 1) {
      ls.erase_after(it);
    }
    // 要素削除をしない場合に、イテレータを進める
    else {
      ++it;
    }
  }

  for (const auto& x : ls) {
    std::cout << x << std::endl;
  }
}
```

#### 出力
```
3
4
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
