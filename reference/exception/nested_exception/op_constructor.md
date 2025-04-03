# コンストラクタ
* exception[meta header]
* std[meta namespace]
* nested_exception[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
nested_exception() noexcept;           // (1) C++11
constexpr nested_exception() noexcept; // (1) C++26

nested_exception(const nested_exception&) noexcept = default;           // (2) C++11
constexpr nested_exception(const nested_exception&) noexcept = default; // (2) C++26
```

## nested_exceptionオブジェクトの構築
- (1) : [`current_exception()`](/reference/exception/current_exception.md)を呼び出し、その戻り値をメンバ変数として保持する。


## 例外
投げない


## 例
```cpp example
#include <exception>
#include <iostream>

class my_exception : public std::nested_exception {};

int main()
{
  try {
    try {
      throw 1;
    }
    catch (int& x) {
      my_exception e; // 現在の例外(int)が保持される

      // my_exceptionによって入れ子になった例外へのポインタを取得して再送出
      std::rethrow_exception(e.nested_ptr());
    }
  }
  catch (int& x) {
    std::cout << x << std::endl;
  }
} 
```
* nested_ptr()[link nested_ptr.md]
* std::rethrow_exception[link /reference/exception/rethrow_exception.md]

### 出力
```
1
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 3 [mark verified]
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2015 [mark verified]


## 関連項目
- [C++26 定数評価での例外送出を許可](/lang/cpp26/allowing_exception_throwing_in_constant-evaluation.md)

