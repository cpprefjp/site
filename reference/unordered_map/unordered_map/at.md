# at
* unordered_map[meta header]
* std[meta namespace]
* unordered_map[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
T& at(const key_type& x);
const T& at(const key_type & x) const;
```

## 概要
参照のためのメソッドで、取り出す時にキーの存在チェックをする。

## 戻り値
キーxに対応する値を返す。

## 例外
オブジェクトが存在しないときは、out_of_range例外を投げる。

## 計算量
- 平均： 定数時間
- 最悪： [`size`](size.md) について線形時間


## 例
```cpp example
#include <iostream>
#include <unordered_map>

template<class Container, class T>
void at_wrap(Container &c, T v) {

  try{
    std::cout << c.at(v) << std::endl;
  }
  catch(std::out_of_range&) {
    std::cout << "exception std::out_of_ranget" << std::endl;
  }
}

int main()
{
  std::unordered_map<int, char> um;
  um.insert(std::make_pair(1,'a'));

  at_wrap(um, 1);
  at_wrap(um, 2);

  return 0;
}
```
* um.insert[link insert.md]
* c.at[link at.md]

### 出力
```
a
exception std::out_of_ranget
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

## 関連項目

| 名前                        | 説明           |
|-----------------------------|----------------|
| [`operator=`](op_assign.md) | 代入演算子     |
| [`insert`](insert.md)       | 要素を挿入する |


## 参照
- [LWG Issue 761. `unordered_map` needs an `at()` member function](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#759)
