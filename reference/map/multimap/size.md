# size
* map[meta header]
* std[meta namespace]
* multimap[meta class]
* function[meta id-type]

```cpp
size_type size() const noexcept;
```

## 概要
コンテナ内の要素の数を返す。


## 戻り値
`multimap` コンテナに格納されている要素の数を返す。 
メンバ型 `size_type` は符号なし整数型である。


## 計算量
定数時間


## 例
```cpp
#include <iostream>
#include <map>

int main ()
{
  std::multimap<int, char> m;

  std::cout << m.size() << std::endl;

  m.insert(std::make_pair(1, 'a'));
  m.insert(std::make_pair(2, 'b'));
  m.insert(std::make_pair(3, 'c'));
  m.insert(std::make_pair(1, 'a'));

  std::cout << m.size() << std::endl;

  return 0;
}
```
* size()[color ff0000]
* m.insert[link insert.md]

### 出力
```
0
4
```

## バージョン
### 言語
- C++03

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??, 11.0


## 参照

| 名前 | 説明|
|-------------------------------------------------------------------------------------------|-----------------------------------------------------|
| [`max_size`](/reference/map/multimap/max_size.md) | 格納可能な最大の要素数を取得する |
| [`empty`](/reference/map/multimap/empty.md) | コンテナが空であるかどうかを調べる |


