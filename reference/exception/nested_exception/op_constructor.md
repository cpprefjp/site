# コンストラクタ
* exception[meta header]
* std[meta namespace]
* nested_exception[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
nested_exception() noexcept;                                  // (1) C++11
nested_exception(const nested_exception&) noexcept = default; // (2) C++11
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


## 参照
- [P3842R2 A conservative fix for constexpr `uncaught_exceptions()` and `current_exception()`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3842r2.pdf)
    - C++26の策定中に`constexpr`が追加されたが、本提案文書により巻き戻された (C++29で再検討予定)
