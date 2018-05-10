# コンストラクタ
* condition_variable[meta header]
* std[meta namespace]
* condition_variable[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
condition_variable();                                   // (1)
condition_variable(const condition_variable&) = delete; // (2)
```

## 概要
- (1) : デフォルトコンストラクタ。`condition_variable`オブジェクトの初期化を行う
- (2) : コピーコンストラクタ。コピー不可。これによってムーブも不可。


## 例外
この関数は、以下のerror conditionを持つ[`system_error`](/reference/system_error/system_error.md)例外オブジェクトを送出する可能性がある：

- `resource_unavailable_try_again` : いくつかの非メモリリソースの制限によって初期化できない


## 例
```cpp example
#include <condition_variable>

int main()
{
  std::condition_variable cond;
}
```

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013
	- 2012までは、delete宣言に対応していないため、代わりにprivateで宣言のみ行う手法で代用されている。

## 参照


