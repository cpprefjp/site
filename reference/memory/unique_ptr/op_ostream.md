# operator<<
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class E, class T, class Y, class D>
  std::basic_ostream<E, T>&
    operator<<(std::basic_ostream<E, T>& os,
               const unique_ptr<Y, D>& p); // (1) C++17
}
```

## 概要
ストリームへ出力する。


## テンプレートパラメータ制約

- `os << p.get()`が妥当な式であること


## 効果
以下と等価：

```cpp
os << p.get();
```
* get()[link get.md]


## 戻り値
`os`


## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  std::unique_ptr<int> p(new int(3));

  std::cout << p << std::endl;
}
```

### 出力例
```
0x14d1b20
```

## バージョン
### 言語
- C++17

### 処理系
- [GCC](/implementation.md#gcc): 10 [mark verified]
- [Clang](/implementation.md#clang): 7.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [LWG Issue 2948. `unique_ptr` does not define `operator<<` for stream output](https://wg21.cmeerw.net/lwg/issue2948)
