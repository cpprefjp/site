# equal_range
* unordered_map[meta header]
* std[meta namespace]
* unordered_multimap[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
pair<iterator,iterator> equal_range(const key_type& x);
pair<const_iterator,const_iterator> equal_range(const key_type& x) const;
```
* pair[link /reference/utility/pair.md]

## 概要
コンテナ内の、`x` と等しい全てのキー要素を含む範囲の境界を返す。

もし `x` がコンテナ内のどのキーともマッチしなかった場合、戻り値の範囲は長さ 0 になり、両方のイテレータは [`end`](end.md) を指す。


## パラメータ
- `x` : 比較されるキー値。`key_type` はメンバ型であり、`map` コンテナ内で `Key` の別名として定義される。ここで `Key` は最初のテンプレートパラメータである。


## 戻り値
`pair` を返す。
`pair::first` は 範囲の下境界にあたり、
`pair::second` は 範囲の上境界にあたる。
`iterator` はメンバ型であり `unordered_multimap` において双方向イテレータとして定義される。


## 計算量
- 平均： 定数時間
- 最悪： [`size`](size.md) について線形時間


## 例
```cpp example
#include <iostream>
#include <unordered_map>
#include <algorithm>

using it_t = std::unordered_multimap<int,char>::iterator;

void disp( std::pair<const int,char>& p) {
  std::cout << p.second << std::endl;
}

int main()
{
  std::unordered_multimap<int,char> um;

  um.insert(std::make_pair(1,'a'));
  um.insert(std::make_pair(1,'b'));
  um.insert(std::make_pair(1,'c'));

  std::pair<it_t, it_t> ret = um.equal_range(1);

  std::cout << "--- ret" << std::endl;
  std::for_each(ret.first, ret.second, disp);


  std::pair<it_t, it_t> ret2 = um.equal_range(0);
  std::cout << "--- ret2" << std::endl;
  std::cout << "first:" << ( ret2.first == um.end() )  << std::endl;
  std::cout << "second:" << ( ret2.second == um.end() )  << std::endl;

  return 0;
}
```
* equal_range[color ff0000]
* um.insert[link insert.md]
* um.end()[link end.md]

### 出力
```
--- ret
a
b
c
--- ret2
first:1
second:1
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012


## 参照

| 名前                | 説明                                   |
|---------------------|----------------------------------------|
| [`count`](count.md) | 指定したキーにマッチする要素の数を返す |
| [`find`](find.md)   | 指定したキーで要素を探す               |
