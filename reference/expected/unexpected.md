# unexpected
* expected[meta header]
* class template[meta id-type]
* std[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std {
  template<class E>
  class unexpected;
}
```

## 概要
`unexpected`クラスは、任意の型`E`の値をエラー値として表現する。


## 適格要件
`E`は非オブジェクト型、配列型、`unexpected<U>`、CV修飾された型のいずれでもないこと。


## メンバ関数
### 構築・破棄

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|-------|
| [`(constructor)`](unexpected/op_constructor.md.nolink) | コンストラクタ | C++23 |
| [`(destructor)`](unexpected/op_destructor.md.nolink)   | デストラクタ | C++23 |

### 代入

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|-------|
| [`operator=`](unexpected/op_assign.md.nolink) | 代入演算子     | C++23 |
| [`swap`](unexpected/swap.md.nolink) | 他の`unexpected`オブジェクトとデータを入れ替える | C++23 |

### 値の観測

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|-------|
| [`error`](unexpected/error.md.nolink) | エラー値を取得する | C++23 |

### 比較

| 名前         | 説明       | 対応バージョン |
|--------------|------------|-------|
| [`operator==`](unexpected/op_equal.md.nolink) | 等値比較 | C++23 |
| [`operator!=`](unexpected/op_not_equal.md.nolink) | 非等値比較 | C++23 |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`swap`](unexpected/swap_free.md.nolink) | 他の`unexpected`オブジェクトとデータを入れ替える | C++23 |

## 推論補助

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`(deduction_guide)`](unexpected/op_deduction_guide.md.nolink) | クラステンプレートの推論補助 | C++23 |


## 例
```cpp example
#include <expected>
#include <iomanip>
#include <iostream>
#include <string>

// 整数除算
std::expected<int, std::string> idiv(int a, int b)
{
  if (b == 0) {
    return std::unexpected{"divide by zero"};
  }
  if (a % b != 0) {
    return std::unexpected{"out of domain"};        
  }
  return a / b;
}

void dump_result(const std::expected<int, std::string>& v)
{
  if (v) {
    std::cout << *v << std::endl;
  } else {
    std::cout << std::quoted(v.error()) << std::endl;        
  }
}

int main()
{
  dump_result(idiv(10, 2));
  dump_result(idiv(10, 3));
  dump_result(idiv(10, 0));
}
```
* std::unexpected[color ff0000]

### 出力
```
5
"out of domain"
"divide by zero"
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 16.0
- [GCC](/implementation.md#gcc): 12.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`expected`](expected.md)


## 参照
- [P0323R12 std::expected](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0323r12.html)
- [P2549R1 `std::unexpected<E>` should have `error()` as member accessor](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2549r1.html)
