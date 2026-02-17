# emplace_front
* forward_list[meta header]
* std[meta namespace]
* forward_list[meta class]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
template <class... Args>
void emplace_front(Args&&... args);           // (1) C++11 : C++14 まで
template <class... Args>
constexpr void emplace_front(Args&&... args); // (1) C++26

template <class... Args>
reference emplace_front(Args&&... args);           // (2) C++11 : C++17 から
template <class... Args>
constexpr reference emplace_front(Args&&... args); // (2) C++26
```

## 概要
直接構築で新たな要素を先頭に追加する。

この関数の引数 `args...` は、要素型 `value_type` のコンストラクタ引数である。当関数の内部で要素型 `value_type` のコンストラクタを呼び出し、追加する要素を構築する。


## 要件
- `value_type` は、コンテナに対して `args` から直接構築可能であること


## 戻り値
- C++14 まで：なし
- C++17 から：構築した要素への参照


## 計算量
定数時間


## 備考
- この関数の呼び出し後、全てのイテレータは無効化されない。
- 操作中に例外が発生した場合、副作用は発生しない。


## 例
```cpp example
#include <iostream>
#include <forward_list>
#include <utility>
#include <string>
#include <algorithm>

int main()
{
  std::forward_list<std::pair<int, std::string>> ls;

  ls.emplace_front(1, std::string("world"));
  ls.push_front(std::make_pair(3, std::string("hello")));

  std::for_each(ls.begin(), ls.end(), [](decltype(ls)::const_reference x) {
    std::cout << x.first << ',' << x.second << std::endl;
  });
}
```
* emplace_front[color ff0000]
* ls.push_front[link push_front.md]
* ls.begin()[link begin.md]
* ls.end()[link end.md]

### 出力
```
3,hello
1,world
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified], 2017 [mark verified]
	- 2010は、可変引数テンプレートに対応していないため、`args`に1つしか実引数を渡せない。
	- 2012は、可変引数テンプレートに対応していないため、不完全な実装である。


## 関連項目

| 名前                                | 説明                                 |
|-------------------------------------|--------------------------------------|
| [`push_front`](push_front.md)       | 先頭に要素を追加する                 |
| [`emplace_after`](emplace_after.md) | 任意の位置への直接構築による要素挿入 |
| [`insert_after`](insert_after.md)   | 任意の位置への要素挿入               |


## 参照
- [N2680 Proposed Wording for Placement Insert (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2680.pdf)
- [P0084R0 Emplace Return Type](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0084r0.pdf)
- [P0084R1 Emplace Return Type (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0084r1.pdf)
- [P0084R2 Emplace Return Type (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0084r2.pdf)
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
