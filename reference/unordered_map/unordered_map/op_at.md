# operator[]
* unordered_map[meta header]
* std[meta namespace]
* unordered_map[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
T& operator[](const key_type& x);
T& operator[](const key_type&& x);
```

## 概要
要素へのアクセス

## 戻り値
キーxに対応する値を返す。
オブジェクトが存在しないときは、新しい要素が追加される。

## 例外
投げない。


## 計算量
- 平均： 定数時間
- 最悪： [`size`](size.md) について線形時間


## 例
```cpp
#include <iostream>
#include <unordered_map>

template<class Container, class T>
void at_wrap(Container &c, T v) {

  std::cout << "{" << c[v] << "}" << std::endl;
}

int main()
{
  std::unordered_map<int, char> um;
  um.insert(std::make_pair(1,'a'));

  std::cout << "size=" << um.size() << std::endl;

  at_wrap(um, 1);
  at_wrap(um, 2);

  std::cout << "size=" << um.size() << std::endl;

  return 0;
}
```
* c[v][color ff0000]
* um.insert[link insert.md]
* um.size()[link size.md]

### 出力
```
size=1
{a}
{}
size=2
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??, 11.0

## 参照

| 名前                        | 説明           |
|-----------------------------|----------------|
| [`operator=`](op_assign.md) | 代入演算子     |
| [`insert`](insert.md)       | 要素を挿入する |
