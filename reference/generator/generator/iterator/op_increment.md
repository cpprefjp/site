# operator++
* generator[meta header]
* function[meta id-type]
* std[meta namespace]
* generator::iterator[meta class]
* cpp23[meta cpp]

```cpp
iterator& operator++(); // (1)
void operator++(int);   // (2)
```

## 概要
ジェネレータコルーチンを再開し、次の値生成を促す。


## 事前条件
ある[`generator`](../../generator.md)オブジェクト`x`において、`coroutine_`がアクティブスタック`*x.active_`に含まれること。


## 効果
- (1) : 次と等価
    ```cpp
    x.active_->top().resume()
    ```
    * resume()[link /reference/coroutine/coroutine_handle/resume.md]
- (2) : 次と等価: `++*this`


## 戻り値
- (1) : `*this`


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc):
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp):


## 関連項目
- [`generator::begin()`](../begin.md)
