#デストラクタ
* shared_mutex[meta header]
* std[meta namespace]
* shared_lock[meta class]
* function[meta id-type]
* cpp14[meta cpp]

```cpp
~shared_lock();
```

##概要
共有ロックを手放す


##効果
```cpp
if (owns_lock()) {
  pm->unlock_shared();
}
```
* owns_lock()[link ./owns_lock.md]

※`pm`はメンバ変数として保持している、ミューテックスオブジェクトへのポインタ


##バージョン
###言語
- C++14

###処理系
- [Clang, C++14 mode](/implementation.md#clang): 3.5
- [GCC, C++0x mode](/implementation.md#gcc): 4.9
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


