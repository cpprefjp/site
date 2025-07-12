# cend
* flat_set[meta header]
* std[meta namespace]
* flat_set[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
const_iterator cend() const noexcept;
```

## 概要
コンテナの末尾の次を参照するイテレータを取得する。


## 戻り値
コンテナの末尾の次を参照するイテレータ。 
`const_iterator` はメンバ型である。このクラステンプレートにおいて、この型はランダムアクセスイテレータである。


## 計算量
定数時間。


## 備考
- この関数によって返されるイテレータは、`*this`が保持するいずれの要素も参照しない。その指す先は、不正な範囲となるだろう


## 例
```cpp example
#include <flat_set>
#include <iostream>

int main()
{
  std::flat_set<int> fs = {3, 1, 4};

  for (auto i = fs.cbegin(); i != fs.cend(); ++i) {
    std::cout << *i << std::endl;
  }
}
```
* cend()[color ff0000]
* fs.cbegin()[link cbegin.md]

### 出力
```
1
3
4
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 関連項目

| 名前 | 説明 |
|-----------------------------------|-----------------------------|
| [`flat_set::begin`](begin.md)     | 先頭を指すイテレータを取得する |
| [`flat_set::end`](end.md)         | 末尾の次を指すイテレータを取得する |
| [`flat_set::cbegin`](cbegin.md)   | 先頭を指すconstイテレータを取得する |
| [`flat_set::rbegin`](rbegin.md)   | 末尾を指す逆イテレータを取得する |
| [`flat_set::rend`](rend.md)       | 先頭の前を指す逆イテレータを取得する |
| [`flat_set::crbegin`](crbegin.md) | 末尾を指す逆constイテレータを取得する |
| [`flat_set::crend`](crend.md)     | 先頭の前を指す逆constイテレータを取得する |
