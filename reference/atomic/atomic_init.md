#atomic_init (C++11)
```cpp
namespace std {
  template <class T>
  void atomic_init(volatile atomic<T>* object, T desired) noexcept;

  template <class T>
  void atomic_init(atomic<T>* object, T desired) noexcept;
}
```
* atomic[link /reference/atomic/atomic.md]


##概要
アトミックオブジェクトを初期化する


##効果
この関数は、アトミックオブジェクト`object`を値`desired`で非アトミックに初期化する。この関数は、デフォルト構築されたオブジェクトに対して一度だけ呼びださなければならない。変数の初期化中に並行アクセスされた場合、それがアトミックな操作であったとしてもデータ競合を引き起こす。


##戻り値
なし


##例外
投げない


##備考
この関数は、C言語との互換性のために存在している。


##例
```cpp
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x;
  std::atomic_init(&x, 1);

  std::cout << x.load() << std::endl;
}
```

###出力
```
1
```


##バージョン
###言語
- C++11

###処理系

- [Clang, C++11 mode](/implementation.md#clang): 3.3
- [GCC, C++11 mode](/implementation.md#gcc): 
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0

####備考


##参照


