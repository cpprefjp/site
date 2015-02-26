#find
* map[meta header]
* std[meta namespace]
* multimap[meta class]
* function[meta id-type]

```cpp
iterator find(const key_type& x);
const_iterator find(const key_type& x) const;
```

##概要
コンテナ内でキーが `x` である要素を検索し、見つかった場合はそれへのイテレータを返し、見つからなかった場合は [`end()`](/reference/map/multimap/end.md) （コンテナの最後の要素の次）を指すイテレータを返す。


##パラメータ
- `x` : 検索するキー。`key_type` は `multimap` コンテナの中で `Key` の別名として定義される。ここで `Key` は 1 番目のテンプレートパラメータである。


##戻り値
指定した値が見つかった場合はその要素へのイテレータ、そうでない場合は [`end()`](/reference/map/multimap/end.md) へのイテレータ。`iterator` はメンバ型であり、`multimap` においては双方向イテレータとして定義される。


##計算量
[`size`](/reference/map/multimap/size.md) について対数時間。


##例
```cpp
#include <iostream>
#include <map>

int main()
{
  std::multimap<int, char> c;

  c.insert(std::make_pair(1,'a'));

  std::cout << (c.find(1) != c.end()) << std::endl;
  std::cout << (c.find(2) != c.end()) << std::endl;
  return 0;
}
```

###出力
```
1
0
```

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??, 11.0

##参照

| 名前 | 説明|
|-------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| [`multimap::count`](/reference/map/multimap/count.md) | 指定したキーにマッチする要素の数を返す |
| [`multimap::lower_bound`](/reference/map/multimap/lower_bound.md) | 与えられた値より小さくない要素へのイテレータを返す |
| [`multimap::upper_bound`](/reference/map/multimap/upper_bound.md) | 特定の値よりも大きい最初の要素へのイテレータを返す |


