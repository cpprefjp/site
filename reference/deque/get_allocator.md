# get_allocator
* deque[meta header]
* std[meta namespace]
* deque[meta class]
* function[meta id-type]

```cpp
allocator_type get_allocator() const;          // C++03
allocator_type get_allocator() const noexcept; // C++11
```

## 概要
deque オブジェクトの構築に使われるアロケータオブジェクトを取得する


## 戻り値
アロケータオブジェクト。

メンバ型 `allocator_type` は、この `deque` クラスのインスタンス化に使われるテンプレートパラメータの 2 番目の型（アロケータの型）と同じであるよう定義される。


## 例外
投げない


## 計算量
定数時間


## 備考
noexcept修飾はC++11で追加された。


## 例
```cpp example
#include <iostream>
#include <deque>

int main ()
{
  std::deque<int> c;
  int* p = c.get_allocator().allocate(2);

  p[0] = 42;
  p[1] = 84;

  std::cout << p[0] << " " << p[1] << std::endl;

  c.get_allocator().deallocate(p, 2);
}
```
* get_allocator[color ff0000]

### 出力
```
42 84
```

## バージョン
### 言語
- C++03
- C++11

### 処理系
- [Clang](/implementation.md#clang): ?
- [GCC](/implementation.md#gcc): ?
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2002, 2003, 2005, 2008, 2010, 2012, 2013, 2015, 2017
	- 2012, 2013は、`noexcept`が実装されていないため、`throw()`が修飾されている。
	- 2015からは、`noexcept`が修飾されている。

## 参照


