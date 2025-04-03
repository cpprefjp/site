# bad_optional_access
* optional[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  class bad_optional_access : public exception;
}
```
* exception[link /reference/exception/exception.md]

## 概要
`std::bad_optional_access`は、[`std::optional`](/reference/optional/optional.md)クラスのオブジェクトの無効な値にアクセスした場合に発生する例外である。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [(constructor)](bad_optional_access/op_constructor.md) | コンストラクタ | C++17 |
| [(destructor)](bad_optional_access/op_destructor.md) | デストラクタ | C++17 |
| [`operator=`](bad_optional_access/op_assign.md) | 代入演算子 | C++17 |
| [`what`](bad_optional_access/what.md) | エラー理由を取得する | C++17 |


## 例
```cpp example
#include <iostream>
#include <optional>

int main()
{
  std::optional<int> p;
  try {
    p.value(); // 有効値を保持していないのに、有効値を取り出そうとした
  }
  catch (std::bad_optional_access& e) {
    std::cout << "exception : " << e.what() << std::endl;
  }
}
```
* std::bad_optional_access[color ff0000]
* std::optional[link optional.md]
* p.value()[link optional/value.md]

### 出力例
```
exception : bad optional access
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0.1 [mark verified]
- [GCC](/implementation.md#gcc): 7.2 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [LWG Issue 2806. Base class of `bad_optional_access`](https://wg21.cmeerw.net/lwg/issue2806)
