# erase
* unordered_map[meta header]
* std[meta namespace]
* unordered_multimap[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
iterator erase(const_iterator position);                   // (1)

size_type erase(const key_type& k);                        // (2)

iterator erase(const_iterator first, const_iterator last); // (3)
```

## 概要
指定された要素を削除する


## 要件
- `position` は、有効で、かつ、間接参照可能な（dereferenceable、つまり [`cend`](cend.md)`()` ではない）当該コンテナを指す�み取り専用イテレータでなければならない。
- `first` と `last` は `[first, last)` が当該コンテナの有効な範囲である�み取り専用イテレータでなければならない。  
	なお、規格書では `first` は間接参照可能である必要があることになっているが、他の種類のコンテナの要件と照らし合わせると、間接参照可能である必要はない（つまり、`first` と `last` が共に [`cend`](cend.md)`()` でも良い）ものと思われる。


## 効果
- (1) : `position` で指定された要素を削除する。
- (2) : `k` と�価な�ーの要素を削除する。
- (3) : `[first, last)` の範囲にある要素を全て削除する。


## 戻り値
- (1) : 「削除前に、削除された要素の次だった位置」を指すイテレータ。`erase()` を呼び出しても削除された要素以外を指す全てのイテレータは無効にならないため、`std::`[`next`](/reference/iterator/next.md)`(position)` と同じ位置を指す `iterator` である。  
	なお、`position` は `const_iterator` なのに対して、戻り値は `iterator` であるため注意が必要である。
- (2) : 削除した要素数。
- (3) :  「削除前に、削除された要素の範囲の次だった位置」を指すイテレータ。`erase()` を呼び出しても削除された要素以外を指す全てのイテレータは無効にならないため、`last` と同じ位置を指す `iterator` である。  
	なお、`first` 及び `last` は `const_iterator` なのに対して、戻り値は `iterator` であるため注意が必要である。  
	また、要件に示したように `first` が間接参照可能である必要がなかった場合にも、他の種類のコンテナの戻り値と照らし合わせると、`last` と同じ位置を指す `iterator` を返すのが適切であるものと思われる。


## 例外
- (1) : 投げない。
- (2) : コンテナの `key_equal` と `hasher` のオブジェクト（それぞれ `key_eq()` と `hash_function()` が返すオブジェクト）が例外を投げなければ、例外を投げない。
- (3) : 投げない。


## 計算量
- (1) : 平均的なケースでは定数（O(`1`)）だが、最悪のケースではコンテナの要素数に比例（O([`size`](size.md)`()`)）
- (2) : 平均的なケースでは削除された要素数に比例（O([`count`](count.md)`(k)`)）だが、最悪のケースではコンテナの要素数に比例（O([`size`](size.md)`()`)）
- (3) : 平均的なケースでは指定された範囲の要素数に比例（O(`std::`[`distance`](/reference/iterator/distance.md)`(first, last)`)）だが、最悪のケースではコンテナの要素数に比例（O([`size`](size.md)`()`)）


## 備考
削除された要素を指すイテレータ、および、参照のみ無効になる。なお、規格書に明確な記載は無いが、削除された要素を指すポインタも無効になる。


## 例
### 基本的な使い方 (C++11)
```cpp example
#include <iostream>
#include <unordered_map>
#include <iterator>
#include <algorithm>
#include <string>
#include <utility>

using si = std::pair<const std::string, int>;

std::ostream& operator<<(std::ostream& os, const si& p)
{
  return os << '(' << p.first << ", " << p.second << ')';
}

template <class C>
void print(const char* label, const C& c, std::ostream& os = std::cout)
{
  os << label << " : ";
  std::for_each(c.cbegin(), c.cend(), [&os](const si& p) { os << p << ", "; });
  os << '\n';
}

int main()
{
  // 指定した位置にある要素を削除（(1)の形式）
  {
    std::unordered_multimap<std::string, int> um{ {"1st", 1}, {"3rd", 3}, {"5th", 5}, {"7th", 7}, {"9th", 9}, {"3rd", 33}, };
    print("(1) erase(const_iterator) before", um);

    auto it1 = um.find("3rd");
    std::cout << "argument: " << *it1 << '\n';
    auto it2 = um.erase(it1);
    std::cout << "return value: " << *it2 << '\n';
    print("after", um);
    std::cout << std::endl;
  }

  // 指定した�ーと�価な要素を削除（(2)の形式）
  {
    std::unordered_multimap<std::string, int> um{ {"1st", 1}, {"3rd", 3}, {"5th", 5}, {"7th", 7}, {"9th", 9}, {"3rd", 33}, };
    print("(2) erase(const value_type&) before", um);

    auto count1 = um.erase("5th");
    auto count2 = um.erase("8th");
    auto count3 = um.erase("3rd");
    std::cout << "argument: 5th, 8th, 3rd" << '\n';
    std::cout << "return value: " << count1 << ", " << count2 << ", " << count3 << '\n';
    print("after", um);
    std::cout << std::endl;
  }

  // 指定した位置にある要素を削除（(3)の形式）
  {
    std::unordered_multimap<std::string, int> um{ {"1st", 1}, {"3rd", 3}, {"5th", 5}, {"7th", 7}, {"9th", 9}, {"3rd", 33}, };
    print("(3) erase(const_iterator, const_iterator) before", um);

    auto it1 = std::next(um.cbegin());
    auto it2 = std::next(it1, 2);
    std::cout << "arguments: " << *it1 << ", " << *it2 << '\n';
    auto it3 = um.erase(it1, it2);
    std::cout << "return value: " << *it3 << '\n';
    print("after", um);
    std::cout << std::endl;
  }
}
```
* erase[color ff0000]
* std::ostream[link /reference/ostream/basic_ostream.md]
* std::next[link /reference/iterator/next.md]
* cbegin()[link cbegin.md]
* cend()[link cend.md]

#### 出力例
```
(1) erase(const_iterator) before : (9th, 9), (7th, 7), (5th, 5), (3rd, 33), (3rd, 3), (1st, 1), 
argument: (3rd, 33)
return value: (3rd, 3)
after : (9th, 9), (7th, 7), (5th, 5), (3rd, 3), (1st, 1), 

(2) erase(const value_type&) before : (9th, 9), (7th, 7), (5th, 5), (3rd, 33), (3rd, 3), (1st, 1), 
argument: 5th, 8th, 3rd
return value: 1, 0, 2
after : (9th, 9), (7th, 7), (1st, 1), 

(3) erase(const_iterator, const_iterator) before : (9th, 9), (7th, 7), (5th, 5), (3rd, 33), (3rd, 3), (1st, 1), 
arguments: (7th, 7), (3rd, 33)
return value: (3rd, 33)
after : (9th, 9), (3rd, 33), (3rd, 3), (1st, 1), 
```

注：[`unordered_map`](/reference/unordered_map/unordered_map.md) は非順序連想コンテナであるため、出力順序は無意味であることに注意


### イテレート�に要素を削除する
```cpp example
#include <iostream>
#include <unordered_map>

int main()
{
  std::unordered_multimap<int, char> um = {
    {3, 'a'},
    {1, 'b'},
    {4, 'c'}
  };

  // イテレート�に要素削除をするような場合には、
  // 範囲for文は使用できない
  for (auto it = um.begin(); it != um.end();) {
    // 条件一致した要素を削除する
    if (it->first == 1) {
      // 削除された要素の次を指すイテレータが返される
      it = um.erase(it);
    }
    // 要素削除をしない場合に、イテレータを進める
    else {
      ++it;
    }
  }

  for (const auto& x : um) {
    std::cout << x.first << ':' << x.second << std::endl;
  }
}
```

#### 出力例
```
4:c
3:a
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.1
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?


## 関連項目

| 名前                                | 説明                                                   |
|-------------------------------------|--------------------------------------------------------|
| [`emplace`](emplace.md)           | コンテナ内への要素の直接構築                           |
| [`emplace_hint`](emplace_hint.md) | 挿入位置のヒントを使用したコンテナ内への要素の直接構築 |
| [`insert`](insert.md)             | 要素の追加                                             |
| [`clear`](clear.md)               | 全要素の削除                                           |
| [`swap`](swap.md)                 | 内容の交換                                             |


## 参照
- [LWG Issue 518. Are `insert` and `erase` stable for `unordered_multiset` and `unordered_multimap`?](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#518)
    - 安定性の保証が規定された経緯のレポート


