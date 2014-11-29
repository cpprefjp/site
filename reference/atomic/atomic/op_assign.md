#operator= (C++11)
```cpp
atomic& operator=(const atomic&) = delete;
atomic& operator=(const atomic&) volatile = delete;

T operator=(T desired) volatile noexcept;
T operator=(T desired) noexcept;
```

##概要
値を書き込む


##効果
[`store`](/reference/atomic/atomic/store.md)`(desired)`


##戻り値
`desired`


##例外
投げない


##例
```cpp
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x(1);

  x = 2;

  std::cout << x.load() << std::endl;
}
```
* x = 2[color ff0000]


###出力
```
2
```


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0
	- Visual C++ 11.0はコピー代入演算子のdeleteに対応していないため、代わりにprivateで宣言のみ行う手法で代用されている。


##参照


