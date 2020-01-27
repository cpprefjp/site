# operator=
* atomic[meta header]
* std[meta namespace]
* atomic[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
atomic& operator=(const atomic&) = delete;
atomic& operator=(const atomic&) volatile = delete;

T operator=(T desired) volatile noexcept;
T operator=(T desired) noexcept;
```

## 概要
値を書き込む


## 効果
[`store`](/reference/atomic/atomic/store.md)`(desired)`


## 戻り値
`desired`


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x(1);

  x = 2;

  std::cout << x.load() << std::endl;
}
```
* x = 2;[color ff0000]
* x.load()[link load.md]


### 出力
```
2
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013
	- 2012はコピー代入演算�のdeleteに対応していないため、代わりにprivateで宣言のみ行う手法で代用されている。


## 参照


