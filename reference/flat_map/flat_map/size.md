# size
* flat_map[meta header]
* std[meta namespace]
* flat_map[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
size_type size() const noexcept;
```

## 概要
コンテナ内の要素の数を返す。


## 戻り値
コンテナに格納されている要素の数を返す。 
メンバ型 `size_type` は符号なし整数型である。


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <flat_map>

int main ()
{
  std::flat_map<int, char> fm;

  std::cout << fm.size() << std::endl;

  fm.insert({1, 'a'});
  fm.insert({2, 'b'});
  fm.insert({3, 'c'});
  fm.insert({1, 'a'});

  std::cout << fm.size() << std::endl;
}
```
* size()[color ff0000]
* fm.insert[link insert.md.nolink]

### 出力
```
0
3
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`empty()`](empty.md)
