# size
* map[meta header]
* std[meta namespace]
* map[meta class]
* function[meta id-type]

```cpp
size_type size() const noexcept;
```

## 概要
コンテナ内の要素の数を返す。


## 戻り値
`map` コンテナに格納されている要素の数を返す。 
メンバ型 `size_type` は符号なし整数型である。


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <map>

int main ()
{
  std::map<int,char> m;

  std::cout << m.size() << std::endl;

  m.insert( std::make_pair(1, 'a') );
  m.insert( std::make_pair(2, 'b') );
  m.insert( std::make_pair(3, 'c') );
  m.insert( std::make_pair(1, 'a') );

  std::cout << m.size() << std::endl;

  return 0;
}
```
* size()[color ff0000]
* m.insert[link insert.md]

### 出力
```
0
3
```

## バージョン
### 言語
- C++03

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012


## 参照

| 名前 | 説明|
|-------------------------------------------------------------------------------------------|-----------------------------------------------------|
| [`max_size`](/reference/map/map/max_size.md) | 格納可能な最大の要素数を取得する |
| [`empty`](/reference/map/map/empty.md) | コンテナが空であるかどうかを調べる |


