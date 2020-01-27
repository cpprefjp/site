# atomic_is_lock_free
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  bool atomic_is_lock_free(const shared_ptr<T>* p);
}
```


## 概要
`shared_ptr`オブジェクトが�ックフリーに振る舞えるかを判定する。


## 要件
`p != nullptr`であること。


## 戻り値
`*p`オブジェクトに対する操作が�ックフリーに振る舞えるなら`true`、そうでなければ`false`を返す。

`false`を返す場合は、�ックで実装されることを意味する。


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  std::shared_ptr<int> p(new int(3));

  if (std::atomic_is_lock_free(&p)) {
    std::cout << "shared_ptr<int> is lock-free" << std::endl;
  }
  else {
    std::cout << "shared_ptr<int> isn't lock-free" << std::endl;
  }
}
```
* std::atomic_is_lock_free[color ff0000]

### 出力例
```
shared_ptr<int> isn't lock-free
```


## バージョン
### 言語
- C++11


### 処理系
- [Clang](/implementation.md#clang): 3.3
- [GCC](/implementation.md#gcc): 5.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013


## 参照
- [`atomic_is_lock_free() - <atomic>`](/reference/atomic/atomic_is_lock_free.md)
- [N2674 Shared_ptr atomic access, revision 1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2674.htm)
- [C++0x Shared_ptr atomic access - Faith and Brave - C++で遊ぼう](http://faithandbrave.hateblo.jp/entry/20081015/1224066366)

