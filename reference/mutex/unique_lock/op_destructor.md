# デストラクタ
* mutex[meta header]
* std[meta namespace]
* unique_lock[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
~unique_lock();
```

## 概要
�ックを手放す


## 効果
```cpp
if (owns_lock()) {
  pm->unlock();
}
```
* owns_lock()[link owns_lock.md]

※`pm`はメンバ変数として保持している、ミューテックスオブジェクトへのポインタ


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015


## 参照


