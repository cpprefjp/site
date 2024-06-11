# do_deallocate
* memory_resource[meta header]
* function[meta id-type]
* std::pmr[meta namespace]
* memory_resource[meta class]
* cpp17[meta cpp]

```cpp
virtual void do_deallocate(void* p, std::size_t bytes, std::size_t alignment) = 0;
```

## 概要
[`do_allocate`](do_allocate.md)によって確保されたメモリを解放する。

## 要件
`p`の指すサイズ`bytes`のメモリ領域は、`*this`もしくは等しい`memory_resource`オブジェクト（`this->is_equal(other) == true`となるような`other`）の[`allocate`](allocate.md)`(bytes, alignment)`によって事前に確保された領域であること。  
かつ、そのメモリ領域は未解放であること。

## 引数
- `p` -- 解放する領域へのポインタ
- `bytes` -- `p`の確保時の要求サイズ
- `alignment` -- `p`の確保時アライメント要求

## 効果
指定されたメモリ領域を解放する。

## 例外
投げない

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6 [mark verified]

## 関連項目
- [`do_allocate`](do_allocate.md)
- [`deallocate`](deallocate.md)
