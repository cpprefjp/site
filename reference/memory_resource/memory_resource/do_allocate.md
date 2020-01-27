# do_allocate
* memory_resource[meta header]
* function[meta id-type]
* std::pmr[meta namespace]
* memory_resource[meta class]
* cpp17[meta cpp]

```cpp
virtual void* do_allocate(std::size_t bytes, std::size_t alignment) = 0;
```

## 概要
派生クラスでオーバライドし、メモリを確保する処理を実装する。

## 事前条件
`alignment`は2の累乗であること

## 引数

- `bytes` -- 確保する領域のサイズ
- `alignment` -- 確保領域のアライメント要求

## 効果
少なくとも`bytes`のメモリを確保し、`alignment`にアラインする。

## 戻り値
確保したメモリ領域の先�ポインタ。

## 例外
要求されたアライメントで`bytes`のメモリ領域を確保できない場合、例外を送出する。

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6

## 関連項目
- [`do_deallocate`](do_deallocate.md)
- [`allocate`](allocate.md)


## 参照
- [LWG Issue 2843. Unclear behavior of `std::pmr::memory_resource::do_allocate()`](https://wg21.cmeerw.net/lwg/issue2843)
