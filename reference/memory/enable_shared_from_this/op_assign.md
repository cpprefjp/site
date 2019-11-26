# operator=
* memory[meta header]
* std[meta namespace]
* enable_shared_from_this[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
enable_shared_from_this& operator=(const enable_shared_from_this&) noexcept;
```

## 概要
何もしない。  
保持するポインタ（`this`を指す`weak_ptr<T>`）は変更されない。


## 戻り値
`*this`


## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.3.6
- [Clang](/implementation.md#clang): 3.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2008 (TR1), 2010, 2012, 2013
