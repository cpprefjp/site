# value
* optional[meta header]
* std[meta namespace]
* optional[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
constexpr const T& value() const&;   // (1)
constexpr T& value() &;              // (2)
constexpr T&& value() &&;            // (3)
constexpr const T&& value() const&&; // (4)
```

## 概要
有効値を取得する。

- (1) : `*this`が`const`左辺値である場合に、有効値への`const`左辺値参照を返す
- (2) : `*this`が非`const`左辺値である場合に、有効値への非`const`左辺値参照を返す
- (3) : `*this`が右辺値である場合に、有効値への右辺値参照を返す
- (4) : `*this`が`const`右辺値である場合に、有効値への`const`右辺値参照を返す


## 効果
- (1), (2) : 有効値を保持している場合、有効値への参照を返す
- (3), (4) : 有効値を保持している場合、有効値をムーブして返す


## 例外
有効値を保持していない状態でこの関数が呼び出された場合、[`bad_optional_access`](/reference/optional/bad_optional_access.md)例外を送出する。


## 例
```cpp
#include <iostream>
#include <optional>

int main()
{
  std::optional<int> p1 = 3;
  if (p1) {
    int result = p1.value(); // 保持している値を取得する
    std::cout << "p1 : " << result << std::endl;
  }

  std::optional<int> p2;
  try {
    p2.value(); // 有効値を保持していないのに、有効値を取り出そうとした
  }
  catch (std::bad_optional_access& e) {
    std::cout << "p2 exception : " << e.what() << std::endl;
  }
}
```
* value()[color ff0000]
* std::bad_optional_access[link /reference/optional/bad_optional_access.md]

### 出力
```
p1 : 3
p2 exception : bad optional access
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang, C++17 mode](/implementation.md#clang): 4.0.1
- [GCC, C++17 mode](/implementation.md#gcc): 7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [getかvalueか - Faith and Brave - C++で遊ぼう](http://faithandbrave.hateblo.jp/entry/2014/08/05/151146)
